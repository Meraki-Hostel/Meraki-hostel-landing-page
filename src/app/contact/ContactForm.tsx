"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getContact } from "@/config/brand";
import { Icon } from "@/components/ui/Icon";
import {
  contactSchema,
  toContactFieldErrors,
  type ContactField,
  type ContactFieldErrors,
  type ContactInput,
} from "@/lib/contact-schema";

type FormValues = Omit<ContactInput, "consent" | "website"> & {
  consent: boolean;
};

const EMPTY: FormValues = {
  name: "",
  contactMethod: "",
  inquiryType: "pre-sales",
  message: "",
  consent: false,
};

type SubmitError =
  null | "not_configured" | "rate_limited" | "network" | "server";

const ERROR_COPY: Record<Exclude<SubmitError, null>, string> = {
  not_configured:
    "Our contact form isn't accepting messages right now. Please email us instead.",
  rate_limited:
    "You've sent a few messages in a short time. Please wait a few minutes and try again, or email us.",
  network:
    "We couldn't reach our servers. Check your connection and try again, or email us.",
  server:
    "Something went wrong on our side and your message was not sent. Please try again, or email us.",
};

/** `enabled` is false when the server has nowhere to deliver messages; the form
 * is then shown disabled with an honest notice instead of pretending to send. */
export function ContactForm({ enabled }: { enabled: boolean }) {
  const contact = getContact();
  const router = useRouter();
  const honeypot = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<SubmitError>(null);

  const handleInputChange = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field in errors && errors[field as ContactField]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !enabled) return;

    const parsed = contactSchema.safeParse({
      ...form,
      website: honeypot.current?.value ?? "",
    });
    if (!parsed.success) {
      setErrors(toContactFieldErrors(parsed.error));
      setSubmitError(null);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        // Success only once the server confirmed delivery.
        router.push("/thank-you");
        return;
      }
      const body: {
        error?: string;
        fieldErrors?: ContactFieldErrors;
      } | null = await res.json().catch(() => null);
      if (res.status === 400 && body?.fieldErrors) {
        setErrors(body.fieldErrors);
      } else if (res.status === 429) {
        setSubmitError("rate_limited");
      } else if (res.status === 503) {
        setSubmitError("not_configured");
      } else {
        setSubmitError("server");
      }
    } catch {
      setSubmitError("network");
    }
    setIsSubmitting(false);
  };

  const fieldClass = (field: ContactField) =>
    [
      "mt-1.5 w-full rounded-btn border bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso placeholder:text-dust/70 focus:outline-none focus:ring-1",
      errors[field]
        ? "border-brick focus:border-brick focus:ring-brick"
        : "border-line focus:border-clay-600 focus:ring-clay-600",
    ].join(" ");

  const fieldError = (field: ContactField) =>
    errors[field] ? (
      <p
        id={`contact-${field}-error`}
        className="mt-1 font-body text-caption text-brick"
      >
        {errors[field]}
      </p>
    ) : null;

  const a11y = (field: ContactField) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
  });

  const mailto = `mailto:${contact.email}`;

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container-page max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
            <span className="size-1.5 rounded-full bg-clay-600" />
            Direct Contact
          </span>

          <h1 className="mt-4 font-heading text-h1 font-medium tracking-tight text-espresso leading-[1.1]">
            Have questions? Talk to our team.
          </h1>

          <p className="mt-3 font-body text-lead text-dust max-w-2xl">
            Whether you have pre-sales questions about property limits, need
            help choosing a plan, or need onboarding assistance, we reply
            promptly.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Simple Contact Form */}
          <div className="lg:col-span-7">
            <div className="card p-6 md:p-8 bg-cream shadow-card">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h2 className="font-heading text-h3 font-medium text-espresso border-b border-line/60 pb-3">
                  Send us a message
                </h2>

                {!enabled ? (
                  <div
                    role="status"
                    className="rounded-btn border border-line bg-sand/50 p-4 font-body text-small text-bark"
                  >
                    This form can&rsquo;t send messages right now. Please email{" "}
                    <a
                      href={mailto}
                      className="font-medium text-clay-600 underline"
                    >
                      {contact.email}
                    </a>{" "}
                    and we&rsquo;ll reply within 24 hours.
                  </div>
                ) : null}

                {submitError ? (
                  <div
                    role="alert"
                    className="rounded-btn border border-brick/40 bg-brick/5 p-4 font-body text-small text-bark"
                  >
                    {ERROR_COPY[submitError]}{" "}
                    <a
                      href={mailto}
                      className="font-medium text-clay-600 underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                ) : null}

                <fieldset
                  disabled={!enabled || isSubmitting}
                  className="space-y-5 border-0 p-0 m-0 min-w-0"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-body text-small font-medium text-espresso"
                    >
                      Your Full Name <span className="text-brick">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="e.g. Vikram Malhotra"
                      className={fieldClass("name")}
                      {...a11y("name")}
                    />
                    {fieldError("name")}
                  </div>

                  {/* Email or Phone */}
                  <div>
                    <label
                      htmlFor="contact-method"
                      className="block font-body text-small font-medium text-espresso"
                    >
                      Email or Mobile Number{" "}
                      <span className="text-brick">*</span>
                    </label>
                    <input
                      id="contact-method"
                      type="text"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={form.contactMethod}
                      onChange={(e) =>
                        handleInputChange("contactMethod", e.target.value)
                      }
                      placeholder="e.g. vikram@pgresidency.in or 98765 43210"
                      className={fieldClass("contactMethod")}
                      {...a11y("contactMethod")}
                    />
                    {fieldError("contactMethod")}
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label
                      htmlFor="contact-inquiryType"
                      className="block font-body text-small font-medium text-espresso"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="contact-inquiryType"
                      value={form.inquiryType}
                      onChange={(e) =>
                        handleInputChange(
                          "inquiryType",
                          e.target.value as FormValues["inquiryType"],
                        )
                      }
                      className="mt-1.5 w-full rounded-btn border border-line bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso focus:border-clay-600 focus:outline-none focus:ring-1 focus:ring-clay-600"
                    >
                      <option value="pre-sales">
                        Pre-Sales / Plan Selection Question
                      </option>
                      <option value="onboarding">
                        Assisted Onboarding & Account Setup
                      </option>
                      <option value="support">Existing Customer Support</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-body text-small font-medium text-espresso"
                    >
                      Your Message <span className="text-brick">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Tell us about your property, bed count, or any questions you have..."
                      className={fieldClass("message")}
                      {...a11y("message")}
                    />
                    {fieldError("message")}
                  </div>

                  {/* Honeypot: hidden from people and assistive tech */}
                  <div aria-hidden="true" className="absolute -left-[9999px]">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      ref={honeypot}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Consent (DPDP): unticked by default */}
                  <div>
                    <label className="flex items-start gap-3 font-body text-small text-bark">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) =>
                          handleInputChange("consent", e.target.checked)
                        }
                        className="mt-1 size-4 shrink-0 accent-clay-600"
                        {...a11y("consent")}
                      />
                      <span>
                        I agree to be contacted about my message and have read
                        the{" "}
                        <Link
                          href="/privacy"
                          className="font-medium text-clay-600 underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    {fieldError("consent")}
                  </div>

                  <button
                    type="submit"
                    disabled={!enabled || isSubmitting}
                    aria-busy={isSubmitting}
                    className="btn btn-primary w-full justify-center py-3 text-body font-medium"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="size-4 animate-spin text-on-clay"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Sending message...</span>
                      </span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>

          {/* Right Column: Direct Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card p-6 bg-cream shadow-card border-line">
              <h2 className="font-heading text-h3 font-medium text-espresso">
                Reach Us Directly
              </h2>
              <p className="mt-1 font-body text-small text-dust leading-relaxed">
                Prefer direct communication? Email our team and we&rsquo;ll reply
                promptly.
              </p>

              <div className="mt-6 space-y-4 font-body text-small">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-btn bg-clay-100 text-clay-600">
                    <Icon name="mail" size={16} />
                  </span>
                  <div>
                    <span className="font-semibold text-espresso block">
                      Email
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-clay-600 underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {contact.phone ? (
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-btn bg-clay-100 text-clay-600">
                      <Icon name="phone" size={16} />
                    </span>
                    <div>
                      <span className="font-semibold text-espresso block">
                        Phone & WhatsApp
                      </span>
                      <a
                        href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                        className="text-clay-600 underline"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-6 rounded-btn border border-line bg-sand/40 p-4 font-body text-caption text-bark">
                <span className="font-semibold text-espresso block">
                  Support Response Hours
                </span>
                <span>
                  Monday through Saturday, 9:00 AM – 7:00 PM IST. Emergency
                  alerts supported 24/7 for active accounts.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
