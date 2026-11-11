import { brand } from "@/config/brand";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Features } from "@/components/sections/Features";
import { Roles } from "@/components/sections/Roles";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section (staggered page-load animation + labeled product screenshot) */}
      <Hero />

      {/* 2. Problem Section (scroll-triggered staggered pain-point cards) */}
      <Problem />

      {/* 3. Features Section (grouped into Billing, Operations, Communication) */}
      <Features />

      {/* 4. Built For Every Role (Owner, Manager/Warden, Student) */}
      <Roles />

      {/* 5. How It Works Section (4 steps ending with CTA to Pricing) */}
      <HowItWorks />

      {/* 6. Pricing Teaser (compact 3-card summary: Starter, Growth, Portfolio) */}
      <PricingTeaser />

      {/* 7. FAQ Section (5 confident, factually correct live items) */}
      <Faq />

      {/* 8. About Section */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="py-16 md:py-24 bg-sand/30 border-b border-line"
      >
        <div className="container-page">
          <div className="rounded-card border border-line bg-cream p-8 md:p-12 max-w-3xl mx-auto text-center shadow-card">
            <h2
              id="about-heading"
              className="font-heading text-h2 font-medium text-espresso"
            >
              About {brand.name}
            </h2>
            <p className="mt-4 font-body text-lead text-bark leading-relaxed">
              Hostel and PG owners in India face unique operational realities:
              high move-in/move-out turnover, split deposits, varied sharing
              ratios, and cash/UPI mixed payments.
            </p>
            <p className="mt-3 font-body text-body text-dust leading-relaxed">
              We built {brand.name} to give operators immediate control of their
              occupancy and rent records, backed by personal setup assistance
              from our team.
            </p>
            <p className="mt-4 font-body text-small font-semibold text-espresso">
              Operated by {brand.companyName}
            </p>
          </div>
        </div>
      </section>

      {/* 9. Final CTA Section (one line restating outcome, one button -> Pricing) */}
      <FinalCta />
    </>
  );
}
