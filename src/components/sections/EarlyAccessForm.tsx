"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import {
  LIMITS,
  leadSchema,
  toFieldErrors,
  type FieldErrors,
  type LeadField,
} from "@/lib/lead-schema";
import { Icon } from "@/components/ui/Icon";
import type { content } from "@/config/site-content";

type Copy = (typeof content)["earlyAccess"];

type EarlyAccessFormProps = {
  copy: Copy;
  submitLabel: string;
  /** Computed on the server: webhook + contact email + reviewed privacy notice. */
  enabled: boolean;
  contact: { email?: string; phone?: string };
};

type Values = Record<Exclude<LeadField, "consent">, string> & { consent: boolean; website: string };

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; reason: "invalid" | "rejected" | "notConfigured" | "upstream" | "rateLimited" };

const EMPTY: Values = {
  name: "",
  property: "",
  phone: "",
  email: "",
  city: "",
  beds: "",
  properties: "",
  challenge: "",
  consent: false,
  website: "",
};

const FIELD_ORDER: LeadField[] = ["name", "property", "phone", "email", "city", "beds", "properties", "challenge", "consent"];

const CLIENT_TIMEOUT_MS = 15_000;

export function EarlyAccessForm({ copy, submitLabel, enabled, contact }: EarlyAccessFormProps) {
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [validated, setValidated] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);

  const id = (field: string) => `${uid}-${field}`;
  const f = copy.fields;

  const validate = (next: Values) => {
    const result = leadSchema.safeParse(next);
    return result.success ? {} : toFieldErrors(result.error);
  };

  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (validated) setErrors(validate(next));
  };

  const focusSummary = () => requestAnimationFrame(() => summaryRef.current?.focus());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || inFlight.current) return; // duplicate-submit guard

    setValidated(true);
    const clientErrors = validate(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      setStatus({ kind: "error", reason: "invalid" });
      focusSummary();
      return;
    }

    inFlight.current = true;
    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(CLIENT_TIMEOUT_MS),
      });
      const body: unknown = await response.json().catch(() => null);
      const data = (body && typeof body === "object" ? body : {}) as { ok?: unknown; fieldErrors?: FieldErrors };

      if (response.status === 200 && data.ok === true) {
        setStatus({ kind: "success" });
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (response.status === 400 && data.fieldErrors && Object.keys(data.fieldErrors).length) {
        setErrors(data.fieldErrors);
        setStatus({ kind: "error", reason: "invalid" });
      } else if (response.status === 400) {
        setStatus({ kind: "error", reason: "rejected" });
      } else if (response.status === 429) {
        setStatus({ kind: "error", reason: "rateLimited" });
      } else if (response.status === 503) {
        setStatus({ kind: "error", reason: "notConfigured" });
      } else {
        setStatus({ kind: "error", reason: "upstream" });
      }
      focusSummary();
    } catch {
      // Offline, timeout or a non-JSON platform error page: never treated as success.
      setStatus({ kind: "error", reason: "upstream" });
      focusSummary();
    } finally {
      inFlight.current = false;
    }
  }

  if (status.kind === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border-l-2 border-success bg-success-tint p-6 focus:outline-none"
      >
        <Icon name="checkCircle" size={24} className="text-success" />
        <h3 className="mt-3 text-h3">{copy.success.title}</h3>
        <p className="mt-2">{copy.success.body}</p>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const fieldErrorList = FIELD_ORDER.filter((field) => errors[field]);
  const mailto = contact.email ? buildMailto(contact.email, values) : undefined;

  const describe = (field: LeadField, extra?: string) =>
    [errors[field] ? id(`${field}-error`) : null, extra].filter(Boolean).join(" ") || undefined;

  const fieldError = (field: LeadField) =>
    errors[field] ? (
      <p id={id(`${field}-error`)} className="field-error">
        <Icon name="warning" size={16} className="mt-0.5 flex-none" />
        {errors[field]}
      </p>
    ) : null;

  const label = (field: string, text: string, required = true) => (
    <label htmlFor={id(field)} className="field-label">
      {text} {required ? <span className="field-required">(required)</span> : <span className="field-required">(optional)</span>}
    </label>
  );

  const fallback = (contact.email || contact.phone) && (
    <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
      {mailto ? (
        <li>
          <a href={mailto} className="inline-flex min-h-11 items-center gap-2 font-medium text-accent-900 underline">
            <Icon name="mail" size={16} /> Email us
          </a>
        </li>
      ) : null}
      {contact.phone ? (
        <li>
          <a href={`tel:${contact.phone.replace(/[\s-]/g, "")}`} className="inline-flex min-h-11 items-center gap-2 font-medium text-accent-900 underline">
            <Icon name="phone" size={16} /> Call {contact.phone}
          </a>
        </li>
      ) : null}
    </ul>
  );

  const statusMessage =
    status.kind === "error" && status.reason !== "invalid" ? copy.errors[status.reason] : null;

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={submitting} aria-describedby={id("note")}>
      {!enabled ? (
        <div className="mb-6 flex gap-3 rounded-input bg-warning-tint p-4">
          <Icon name="warning" size={20} className="mt-0.5 flex-none text-warning" />
          <div>
            <p className="font-medium">{copy.disabled.title}</p>
            <p className="mt-1 text-small">
              {contact.email || contact.phone ? copy.disabled.withContact : copy.disabled.withoutContact}
            </p>
            {fallback}
          </div>
        </div>
      ) : null}

      {/* Announcements for every outcome (specs/01 FR-41). */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="polite"
        className="focus:outline-none"
      >
        {status.kind === "error" && status.reason === "invalid" && fieldErrorList.length ? (
          <div className="mb-6 rounded-input border-l-2 border-danger bg-danger-tint p-4">
            <p className="font-medium">{copy.errors.invalid}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-small">
              {fieldErrorList.map((field) => (
                <li key={field}>
                  <a href={`#${id(field)}`} className="text-danger underline">
                    {errors[field]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {statusMessage ? (
          <div className="mb-6 rounded-input border-l-2 border-danger bg-danger-tint p-4">
            <p className="font-medium">{statusMessage}</p>
            {status.kind === "error" && status.reason !== "rateLimited" ? fallback : null}
          </div>
        ) : null}
        {submitting ? <p className="sr-only">Sending your request…</p> : null}
      </div>

      <fieldset disabled={!enabled} className="m-0 min-w-0 space-y-5 border-0 p-0">
        <legend className="sr-only">Early-access request</legend>

        <div>
          {label("name", f.name.label)}
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name.max + 20}
            className="field-control"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            required
          />
          {fieldError("name")}
        </div>

        <div>
          {label("property", f.property.label)}
          <input
            id={id("property")}
            name="property"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.property.max + 20}
            className="field-control"
            value={values.property}
            onChange={(e) => update("property", e.target.value)}
            aria-invalid={errors.property ? true : undefined}
            aria-describedby={describe("property")}
            required
          />
          {fieldError("property")}
        </div>

        <fieldset className="mx-0 min-w-0 border-0 p-0">
          <legend className="field-label">
            {f.contactLegend} <span className="field-required">(required)</span>
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={id("phone")} className="field-label">
                {f.phone.label}
              </label>
              <input
                id={id("phone")}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={f.phone.placeholder}
                className="field-control"
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={describe("phone")}
              />
              {fieldError("phone")}
            </div>
            <div>
              <label htmlFor={id("email")} className="field-label">
                {f.email.label}
              </label>
              <input
                id={id("email")}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={f.email.placeholder}
                maxLength={LIMITS.email}
                className="field-control"
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describe("email")}
              />
              {fieldError("email")}
            </div>
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            {label("city", f.city.label)}
            <input
              id={id("city")}
              name="city"
              type="text"
              autoComplete="address-level2"
              placeholder={f.city.placeholder}
              className="field-control"
              value={values.city}
              onChange={(e) => update("city", e.target.value)}
              aria-invalid={errors.city ? true : undefined}
              aria-describedby={describe("city")}
              required
            />
            {fieldError("city")}
          </div>
          <div>
            {label("beds", f.beds.label)}
            <select
              id={id("beds")}
              name="beds"
              className="field-control"
              value={values.beds}
              onChange={(e) => update("beds", e.target.value)}
              aria-invalid={errors.beds ? true : undefined}
              aria-describedby={describe("beds")}
              required
            >
              <option value="">{f.beds.placeholder}</option>
              {f.beds.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldError("beds")}
          </div>
        </div>

        <div>
          {label("properties", f.properties.label, false)}
          <select
            id={id("properties")}
            name="properties"
            className="field-control"
            value={values.properties}
            onChange={(e) => update("properties", e.target.value)}
            aria-invalid={errors.properties ? true : undefined}
            aria-describedby={describe("properties")}
          >
            <option value="">{f.properties.placeholder}</option>
            {f.properties.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldError("properties")}
        </div>

        <div>
          {label("challenge", f.challenge.label, false)}
          <textarea
            id={id("challenge")}
            name="challenge"
            maxLength={LIMITS.challenge}
            className="field-control"
            value={values.challenge}
            onChange={(e) => update("challenge", e.target.value)}
            aria-invalid={errors.challenge ? true : undefined}
            aria-describedby={describe("challenge", id("challenge-count"))}
          />
          <p id={id("challenge-count")} className="mt-1.5 text-right text-caption text-ink-muted">
            {values.challenge.length} / {LIMITS.challenge}
          </p>
          {fieldError("challenge")}
        </div>

        {/* Honeypot: hidden from people and assistive tech; bots that fill it are rejected. */}
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Website</label>
          <input
            id={id("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        <div>
          <p id={id("note")} className="mb-3 text-small text-ink-muted">
            {copy.notice}
          </p>
          <div className="flex min-h-11 items-start gap-3">
            <input
              id={id("consent")}
              name="consent"
              type="checkbox"
              className="checkbox"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={describe("consent")}
              required
            />
            <label htmlFor={id("consent")} className="text-small">
              {f.consent}{" "}
              <a href="/privacy" className="font-medium text-accent-900 underline">
                {f.consentLink}
              </a>
              . <span className="text-ink-muted">(required)</span>
            </label>
          </div>
          {fieldError("consent")}
        </div>

        <button type="submit" className="btn btn-primary-dark btn-lg w-full" disabled={!enabled || submitting}>
          {submitting ? (
            <>
              <Icon name="spinner" size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            submitLabel
          )}
        </button>
      </fieldset>
    </form>
  );
}

function buildMailto(email: string, values: Values) {
  const lines = [
    `Name: ${values.name}`,
    `Property: ${values.property}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `City: ${values.city}`,
    `Approx. beds: ${values.beds}`,
    `Properties: ${values.properties}`,
    `Challenge: ${values.challenge}`,
  ];
  const params = new URLSearchParams({ subject: "Early access request", body: lines.join("\n") });
  return `mailto:${email}?${params.toString().replace(/\+/g, "%20")}`;
}
