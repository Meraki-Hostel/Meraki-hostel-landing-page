"use client";

import { useState } from "react";
import { getContact } from "@/config/brand";
import { Icon } from "@/components/ui/Icon";

type ContactFormData = {
  name: string;
  contactMethod: string;
  inquiryType: "pre-sales" | "onboarding" | "support";
  message: string;
};

export default function ContactPage() {
  const contact = getContact();

  const [form, setForm] = useState<ContactFormData>({
    name: "",
    contactMethod: "",
    inquiryType: "pre-sales",
    message: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!form.name.trim()) errs.name = "Please enter your full name.";
    if (!form.contactMethod.trim()) {
      errs.contactMethod = "Please enter your email address or phone number.";
    }
    if (!form.message.trim()) {
      errs.message = "Please write your question or inquiry.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate sending message to support team
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

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
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-moss/10 text-moss">
                    <Icon name="check" size={24} />
                  </div>
                  <h2 className="mt-4 font-heading text-h3 font-medium text-espresso">
                    Message received!
                  </h2>
                  <p className="mt-2 font-body text-body text-bark leading-relaxed max-w-md mx-auto">
                    Thank you, {form.name}. Our operations team will review your
                    inquiry and get back to you at{" "}
                    <strong>{form.contactMethod}</strong> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setForm({
                        name: "",
                        contactMethod: "",
                        inquiryType: "pre-sales",
                        message: "",
                      });
                    }}
                    className="mt-6 btn btn-outline text-small"
                  >
                    Send another question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-heading text-h3 font-medium text-espresso border-b border-line/60 pb-3">
                    Send us a message
                  </h2>

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
                      value={form.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="e.g. Vikram Malhotra"
                      className={[
                        "mt-1.5 w-full rounded-btn border bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso placeholder:text-dust/70 focus:outline-none focus:ring-1",
                        errors.name
                          ? "border-brick focus:border-brick focus:ring-brick"
                          : "border-line focus:border-clay-600 focus:ring-clay-600",
                      ].join(" ")}
                    />
                    {errors.name ? (
                      <p className="mt-1 font-body text-caption text-brick">
                        {errors.name}
                      </p>
                    ) : null}
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
                      value={form.contactMethod}
                      onChange={(e) =>
                        handleInputChange("contactMethod", e.target.value)
                      }
                      placeholder="e.g. vikram@pgresidency.in or +91 98765 43210"
                      className={[
                        "mt-1.5 w-full rounded-btn border bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso placeholder:text-dust/70 focus:outline-none focus:ring-1",
                        errors.contactMethod
                          ? "border-brick focus:border-brick focus:ring-brick"
                          : "border-line focus:border-clay-600 focus:ring-clay-600",
                      ].join(" ")}
                    />
                    {errors.contactMethod ? (
                      <p className="mt-1 font-body text-caption text-brick">
                        {errors.contactMethod}
                      </p>
                    ) : null}
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label
                      htmlFor="contact-type"
                      className="block font-body text-small font-medium text-espresso"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="contact-type"
                      value={form.inquiryType}
                      onChange={(e) =>
                        handleInputChange(
                          "inquiryType",
                          e.target.value as ContactFormData["inquiryType"],
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
                      value={form.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Tell us about your property, bed count, or any questions you have..."
                      className={[
                        "mt-1.5 w-full rounded-btn border bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso placeholder:text-dust/70 focus:outline-none focus:ring-1",
                        errors.message
                          ? "border-brick focus:border-brick focus:ring-brick"
                          : "border-line focus:border-clay-600 focus:ring-clay-600",
                      ].join(" ")}
                    />
                    {errors.message ? (
                      <p className="mt-1 font-body text-caption text-brick">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full justify-center py-3 text-body font-medium"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <svg
                            className="size-4 animate-spin text-on-clay"
                            fill="none"
                            viewBox="0 0 24 24"
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
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card p-6 bg-cream shadow-card border-line">
              <h2 className="font-heading text-h3 font-medium text-espresso">
                Reach Us Directly
              </h2>
              <p className="mt-1 font-body text-small text-dust leading-relaxed">
                Prefer direct communication? Reach our team by email or phone.
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
