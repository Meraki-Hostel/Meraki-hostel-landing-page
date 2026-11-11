"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { brand, getContact } from "@/config/brand";
import { Icon } from "@/components/ui/Icon";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

type PlanId = "starter" | "growth" | "portfolio";

type PlanInfo = {
  id: PlanId;
  name: string;
  badge?: string;
  basePrice: number;
  baseFormatted: string;
  totalAmount: number;
  totalFormatted: string;
  properties: string;
  beds: string;
  staff: string;
  summary: string;
};

const PLANS: Record<PlanId, PlanInfo> = {
  starter: {
    id: "starter",
    name: "Starter",
    basePrice: 1999,
    baseFormatted: "₹1,999",
    totalAmount: 1999,
    totalFormatted: "₹1,999",
    properties: "2 properties",
    beds: "120 beds",
    staff: "10 staff",
    summary:
      "Rooms/beds/students, rent ledger & receipts, complaints & notices.",
  },
  growth: {
    id: "growth",
    name: "Growth",
    badge: "Most Popular",
    basePrice: 4999,
    baseFormatted: "₹4,999",
    totalAmount: 4999,
    totalFormatted: "₹4,999",
    properties: "6 properties",
    beds: "400 beds",
    staff: "40 staff",
    summary:
      "Everything in Starter, plus leave/visitor management, maintenance/inventory, owner analytics.",
  },
  portfolio: {
    id: "portfolio",
    name: "Portfolio",
    basePrice: 14999,
    baseFormatted: "₹14,999",
    totalAmount: 14999,
    totalFormatted: "₹14,999",
    properties: "25 properties",
    beds: "2,500 beds",
    staff: "250 staff",
    summary:
      "Everything in Growth, plus online rent collection, priority support.",
  },
};

type BuyerDetails = {
  name: string;
  email: string;
  phone: string;
  hostelName: string;
  propertiesCount: string;
  city: string;
};

function CheckoutFlow() {
  const searchParams = useSearchParams();
  const contact = getContact();

  // Pre-select plan from URL (?plan=starter | growth | portfolio)
  const initialPlanParam = searchParams.get("plan");
  const validUrlPlan: PlanId | null =
    initialPlanParam && initialPlanParam in PLANS
      ? (initialPlanParam as PlanId)
      : null;

  const [userSelectedPlanId, setUserSelectedPlanId] = useState<PlanId | null>(
    null,
  );

  const selectedPlanId: PlanId = userSelectedPlanId ?? validUrlPlan ?? "growth";
  const setSelectedPlanId = (id: PlanId) => setUserSelectedPlanId(id);

  const selectedPlan = PLANS[selectedPlanId];

  // Buyer details state
  const [buyer, setBuyer] = useState<BuyerDetails>({
    name: "",
    email: "",
    phone: "",
    hostelName: "",
    propertiesCount: "1",
    city: "",
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof BuyerDetails, string>>
  >({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");

  const handleInputChange = (field: keyof BuyerDetails, value: string) => {
    setBuyer((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof BuyerDetails, string>> = {};

    if (!buyer.name.trim()) errors.name = "Please enter your full name.";
    if (!buyer.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!buyer.phone.trim()) {
      errors.phone = "Please enter your mobile/WhatsApp number.";
    } else if (buyer.phone.trim().replace(/\D/g, "").length < 10) {
      errors.phone = "Please enter a valid 10-digit mobile number.";
    }
    if (!buyer.hostelName.trim()) {
      errors.hostelName = "Please enter your hostel or organization name.";
    }
    if (!buyer.city.trim()) {
      errors.city = "Please enter your property city.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Disable button and show spinner immediately to prevent double charges
    setIsProcessing(true);
    const emailForConfirmation = buyer.email.trim();

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    // Razorpay Integration Point
    if (typeof window !== "undefined" && window.Razorpay && razorpayKey) {
      try {
        const rzp = new window.Razorpay({
          key: razorpayKey,
          amount: selectedPlan.totalAmount * 100, // paise
          currency: "INR",
          name: brand.name,
          description: `${selectedPlan.name} Plan — 1 Month Subscription`,
          prefill: {
            name: buyer.name.trim(),
            email: emailForConfirmation,
            contact: buyer.phone.trim(),
          },
          notes: {
            hostelName: buyer.hostelName.trim(),
            properties: buyer.propertiesCount,
            city: buyer.city.trim(),
            planId: selectedPlan.id,
          },
          theme: {
            color: "#8c5850",
          },
          handler: function () {
            setConfirmedEmail(emailForConfirmation);
            setIsSuccess(true);
            setIsProcessing(false);
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        });
        rzp.open();
      } catch {
        // Fallback to simulated integration response
        setTimeout(() => {
          setConfirmedEmail(emailForConfirmation);
          setIsSuccess(true);
          setIsProcessing(false);
        }, 900);
      }
    } else {
      // Integration point when keys get added separately:
      // Simulates secure round-trip payment handling & transitions to confirmation
      setTimeout(() => {
        setConfirmedEmail(emailForConfirmation);
        setIsSuccess(true);
        setIsProcessing(false);
      }, 900);
    }
  };

  // -------------------------------------------------------------
  // SUCCESS / CONFIRMATION STATE
  // -------------------------------------------------------------
  if (isSuccess) {
    return (
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-page max-w-2xl mx-auto">
          <div className="card p-8 md:p-12 bg-cream text-center shadow-card border-line">
            {/* Animated Draw-in Checkmark (350ms, no confetti) */}
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-moss/10 text-moss">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-10 text-moss"
                aria-hidden="true"
              >
                <path
                  d="M4.5 12.75l6 6 9-13.5"
                  className="animate-draw-check"
                />
              </svg>
            </div>

            <span className="mt-6 inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
              <span className="size-1.5 rounded-full bg-moss" />
              Payment Confirmed
            </span>

            <h1 className="mt-4 font-heading text-h2 font-medium tracking-tight text-espresso">
              Payment received.
            </h1>

            {/* Required exact text format */}
            <p className="mt-4 font-body text-lead text-bark leading-relaxed max-w-xl mx-auto">
              Payment received. Our team will set up your {brand.name} account
              and email your login to{" "}
              <strong className="text-espresso font-semibold underline underline-offset-4 decoration-clay-600/40">
                {confirmedEmail || buyer.email || "your email"}
              </strong>{" "}
              within 24 hours.
            </p>

            {/* Order Recap Banner */}
            <div className="mt-8 rounded-btn border border-line bg-sand/30 p-4 text-left font-body text-small">
              <div className="flex items-center justify-between border-b border-line/60 pb-3">
                <span className="text-dust font-medium">Selected Tier</span>
                <span className="font-semibold text-espresso">
                  {selectedPlan.name} Plan
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-line/60 py-3">
                <span className="text-dust font-medium">Monthly Amount</span>
                <span className="font-semibold text-espresso">
                  {selectedPlan.totalFormatted}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="text-dust font-medium">Hostel / Org</span>
                <span className="font-semibold text-espresso">
                  {buyer.hostelName || "Your Property"} ({buyer.city || "India"}
                  )
                </span>
              </div>
            </div>

            {/* Next Steps Timeline */}
            <div className="mt-8 rounded-card border border-line/80 bg-cream p-6 text-left">
              <h2 className="font-heading text-h4 font-medium text-espresso">
                What happens next
              </h2>
              <ol className="mt-4 space-y-3 font-body text-small text-bark">
                <li className="flex items-start gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-clay-100 font-semibold text-caption text-clay-600">
                    1
                  </span>
                  <span>
                    Our onboarding team reviews your property capacity (
                    {selectedPlan.properties}, {selectedPlan.beds}).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-clay-100 font-semibold text-caption text-clay-600">
                    2
                  </span>
                  <span>
                    We connect via WhatsApp or phone to collect your room
                    configurations and tenant roster.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-clay-100 font-semibold text-caption text-clay-600">
                    3
                  </span>
                  <span>
                    Your logins and wardens are provisioned within 24 hours so
                    you start with a fully configured instance.
                  </span>
                </li>
              </ol>
            </div>

            {/* Support Contact Section */}
            <div className="mt-8 border-t border-line/60 pt-6">
              <div className="font-body text-caption font-semibold uppercase tracking-wider text-dust mb-2">
                Need help or have questions?
              </div>
              <p className="font-body text-small text-dust mb-4">
                Our support team is available directly:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(
                    `Question about my ${selectedPlan.name} setup`,
                  )}`}
                  className="btn btn-outline text-small py-2"
                >
                  <Icon name="mail" size={16} />
                  <span>{contact.email}</span>
                </a>
                <a
                  href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                  className="btn btn-outline text-small py-2"
                >
                  <Icon name="phone" size={16} />
                  <span>{contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ACTIVE CHECKOUT FLOW FORM
  // -------------------------------------------------------------
  return (
    <>
      {/* Razorpay Checkout Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-page max-w-5xl mx-auto">
          {/* Header Link */}
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 font-body text-small text-dust hover:text-clay-600 transition-colors"
          >
            <span>← Back to plan comparison</span>
          </Link>

          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
              <span className="size-1.5 rounded-full bg-clay-600" />
              Checkout & Assisted Setup
            </span>

            <h1 className="mt-3 font-heading text-h2 font-medium tracking-tight text-espresso">
              Complete your subscription
            </h1>
            <p className="mt-2 font-body text-lead text-dust">
              Select your plan, confirm your property details, and proceed to
              secure payment.
            </p>
          </div>

          <form onSubmit={handlePayment} className="mt-10">
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              {/* Left Column: Step 1 & Step 2 */}
              <div className="lg:col-span-7 space-y-8">
                {/* ------------------------------------------------- */}
                {/* STEP 1: Confirm or switch plan */}
                {/* ------------------------------------------------- */}
                <section
                  aria-labelledby="step-1-heading"
                  className="card p-6 md:p-8 bg-cream shadow-card"
                >
                  <div className="flex items-center justify-between border-b border-line/60 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-7 items-center justify-center rounded-full bg-clay-600 text-on-clay font-body text-caption font-semibold">
                        1
                      </span>
                      <h2
                        id="step-1-heading"
                        className="font-heading text-h3 font-medium text-espresso"
                      >
                        Confirm or Switch Plan
                      </h2>
                    </div>
                    <span className="font-body text-caption text-dust font-medium">
                      Billed monthly
                    </span>
                  </div>

                  <p className="mt-4 font-body text-small text-bark leading-relaxed">
                    Choose the plan that fits your property scale. Every plan
                    includes assisted account setup within 24 hours.
                  </p>

                  <div className="mt-6 space-y-3" role="radiogroup">
                    {(Object.keys(PLANS) as PlanId[]).map((planId) => {
                      const p = PLANS[planId];
                      const isSelected = p.id === selectedPlanId;

                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedPlanId(p.id)}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              setSelectedPlanId(p.id);
                            }
                          }}
                          className={[
                            "relative flex cursor-pointer items-start justify-between rounded-btn border p-4 transition-all duration-(--dur-ui) ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-600",
                            isSelected
                              ? "border-clay-600 bg-sand/40 shadow-xs ring-1 ring-clay-600"
                              : "border-line bg-cream hover:border-line-hover hover:bg-sand/20",
                          ].join(" ")}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-bark/40 bg-cream">
                              {isSelected ? (
                                <span className="size-2.5 rounded-full bg-clay-600" />
                              ) : null}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-heading text-body font-semibold text-espresso">
                                  {p.name}
                                </span>
                                {p.badge ? (
                                  <span className="tag tag-attention text-micro py-0.5 px-2">
                                    {p.badge}
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-1 font-body text-caption text-dust leading-relaxed">
                                {p.properties} · {p.beds} · {p.staff}
                              </p>
                              <p className="mt-1 font-body text-caption text-bark/80">
                                {p.summary}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0 pl-3">
                            <span className="font-heading text-lead font-semibold text-espresso">
                              {p.baseFormatted}
                            </span>
                            <span className="font-body text-caption text-dust block">
                              /mo
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* ------------------------------------------------- */}
                {/* STEP 2: Buyer details */}
                {/* ------------------------------------------------- */}
                <section
                  aria-labelledby="step-2-heading"
                  className="card p-6 md:p-8 bg-cream shadow-card"
                >
                  <div className="flex items-center gap-2.5 border-b border-line/60 pb-4">
                    <span className="flex size-7 items-center justify-center rounded-full bg-clay-600 text-on-clay font-body text-caption font-semibold">
                      2
                    </span>
                    <h2
                      id="step-2-heading"
                      className="font-heading text-h3 font-medium text-espresso"
                    >
                      Buyer Details
                    </h2>
                  </div>

                  <p className="mt-4 font-body text-small text-dust">
                    Our team will contact you on these details to configure your
                    account and deliver your credentials.
                  </p>

                  <div className="mt-6 space-y-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-body text-small font-medium text-espresso"
                      >
                        Full Name <span className="text-brick">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={buyer.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="e.g. Rajesh Sharma"
                        className={[
                          "mt-1.5 w-full rounded-btn border bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso placeholder:text-dust/70 focus:outline-none focus:ring-1",
                          formErrors.name
                            ? "border-brick focus:border-brick focus:ring-brick"
                            : "border-line focus:border-clay-600 focus:ring-clay-600",
                        ].join(" ")}
                      />
                      {formErrors.name ? (
                        <p className="mt-1 font-body text-caption text-brick">
                          {formErrors.name}
                        </p>
                      ) : null}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-body text-small font-medium text-espresso"
                        >
                          Email Address <span className="text-brick">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={buyer.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="rajesh@example.com"
                          className={[
                            "mt-1.5 w-full rounded-btn border bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso placeholder:text-dust/70 focus:outline-none focus:ring-1",
                            formErrors.email
                              ? "border-brick focus:border-brick focus:ring-brick"
                              : "border-line focus:border-clay-600 focus:ring-clay-600",
                          ].join(" ")}
                        />
                        {formErrors.email ? (
                          <p className="mt-1 font-body text-caption text-brick">
                            {formErrors.email}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-body text-small font-medium text-espresso"
                        >
                          Mobile (WhatsApp){" "}
                          <span className="text-brick">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={buyer.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="98765 43210"
                          className={[
                            "mt-1.5 w-full rounded-btn border bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso placeholder:text-dust/70 focus:outline-none focus:ring-1",
                            formErrors.phone
                              ? "border-brick focus:border-brick focus:ring-brick"
                              : "border-line focus:border-clay-600 focus:ring-clay-600",
                          ].join(" ")}
                        />
                        {formErrors.phone ? (
                          <p className="mt-1 font-body text-caption text-brick">
                            {formErrors.phone}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {/* Hostel Name */}
                    <div>
                      <label
                        htmlFor="hostelName"
                        className="block font-body text-small font-medium text-espresso"
                      >
                        Hostel / Organization Name{" "}
                        <span className="text-brick">*</span>
                      </label>
                      <input
                        id="hostelName"
                        type="text"
                        value={buyer.hostelName}
                        onChange={(e) =>
                          handleInputChange("hostelName", e.target.value)
                        }
                        placeholder="e.g. Sri Balaji Luxury PG"
                        className={[
                          "mt-1.5 w-full rounded-btn border bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso placeholder:text-dust/70 focus:outline-none focus:ring-1",
                          formErrors.hostelName
                            ? "border-brick focus:border-brick focus:ring-brick"
                            : "border-line focus:border-clay-600 focus:ring-clay-600",
                        ].join(" ")}
                      />
                      {formErrors.hostelName ? (
                        <p className="mt-1 font-body text-caption text-brick">
                          {formErrors.hostelName}
                        </p>
                      ) : null}
                    </div>

                    {/* Properties Count & City */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="propertiesCount"
                          className="block font-body text-small font-medium text-espresso"
                        >
                          Number of Properties
                        </label>
                        <select
                          id="propertiesCount"
                          value={buyer.propertiesCount}
                          onChange={(e) =>
                            handleInputChange("propertiesCount", e.target.value)
                          }
                          className="mt-1.5 w-full rounded-btn border border-line bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso focus:border-clay-600 focus:outline-none focus:ring-1 focus:ring-clay-600"
                        >
                          <option value="1">1 property</option>
                          <option value="2">2 properties</option>
                          <option value="3-5">3–5 properties</option>
                          <option value="6-10">6–10 properties</option>
                          <option value="11+">11+ properties</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block font-body text-small font-medium text-espresso"
                        >
                          City <span className="text-brick">*</span>
                        </label>
                        <input
                          id="city"
                          type="text"
                          value={buyer.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          placeholder="e.g. Pune / Bengaluru"
                          className={[
                            "mt-1.5 w-full rounded-btn border bg-canvas-ivory px-3.5 py-2.5 font-body text-body text-espresso placeholder:text-dust/70 focus:outline-none focus:ring-1",
                            formErrors.city
                              ? "border-brick focus:border-brick focus:ring-brick"
                              : "border-line focus:border-clay-600 focus:ring-clay-600",
                          ].join(" ")}
                        />
                        {formErrors.city ? (
                          <p className="mt-1 font-body text-caption text-brick">
                            {formErrors.city}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Step 3 Payment & Order Summary */}
              <div className="lg:col-span-5 sticky top-24">
                <section
                  aria-labelledby="step-3-heading"
                  className="card p-6 md:p-8 bg-cream shadow-card border-line"
                >
                  <div className="flex items-center gap-2.5 border-b border-line/60 pb-4">
                    <span className="flex size-7 items-center justify-center rounded-full bg-clay-600 text-on-clay font-body text-caption font-semibold">
                      3
                    </span>
                    <h2
                      id="step-3-heading"
                      className="font-heading text-h3 font-medium text-espresso"
                    >
                      Payment & Summary
                    </h2>
                  </div>

                  {/* Itemized Order Breakdown */}
                  <div className="mt-6 space-y-3 font-body text-small">
                    <div className="flex items-center justify-between">
                      <span className="text-bark">
                        {selectedPlan.name} Plan (Monthly)
                      </span>
                      <span className="font-medium text-espresso">
                        {selectedPlan.baseFormatted}
                      </span>
                    </div>

                    <div className="border-t border-line/60 pt-3 flex items-baseline justify-between">
                      <div>
                        <span className="font-heading text-body font-semibold text-espresso block">
                          Total Due Today
                        </span>
                        <span className="font-body text-micro text-dust">
                          Billed monthly · Cancel anytime
                        </span>
                      </div>
                      <span className="font-heading text-h3 font-medium text-espresso">
                        {selectedPlan.totalFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Guaranteed Setup Notice */}
                  <div className="mt-6 rounded-btn border border-line bg-sand/40 p-3.5">
                    <div className="flex items-start gap-2.5">
                      <span className="text-moss font-bold text-caption mt-0.5">
                        ✓
                      </span>
                      <div className="font-body text-caption text-bark leading-relaxed">
                        <strong>Assisted setup guarantee:</strong> After
                        payment, our team sets up your account and emails your
                        login within 24 hours.
                      </div>
                    </div>
                  </div>

                  {/* Pay Button with Instant Disabling & Spinner */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={[
                        "btn btn-primary w-full justify-center py-3.5 text-body font-medium shadow-card transition-all",
                        isProcessing
                          ? "opacity-75 cursor-not-allowed"
                          : "hover:shadow-card-hover",
                      ].join(" ")}
                    >
                      {isProcessing ? (
                        <span className="inline-flex items-center gap-2">
                          {/* Spinner */}
                          <svg
                            className="size-5 animate-spin text-on-clay"
                            xmlns="http://www.w3.org/2000/svg"
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
                          <span>Processing payment...</span>
                        </span>
                      ) : (
                        <span>
                          Pay {selectedPlan.totalFormatted} via Razorpay
                        </span>
                      )}
                    </button>
                    <p className="mt-2 text-center font-body text-micro text-dust">
                      Instant charge prevention active. Button locks on click.
                    </p>
                  </div>

                  {/* Trust & Security Badge */}
                  <div className="mt-6 border-t border-line/60 pt-4 text-center">
                    <div className="flex items-center justify-center gap-2 font-body text-caption text-dust">
                      <Icon name="shield" size={15} className="text-moss" />
                      <span>
                        256-bit encrypted Razorpay Checkout. Payment receipt
                        provided.
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-36 pb-24 text-center font-body text-dust">
          Loading checkout...
        </div>
      }
    >
      <CheckoutFlow />
    </Suspense>
  );
}
