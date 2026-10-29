import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Outcomes } from "@/components/sections/Outcomes";
import { Platform } from "@/components/sections/Platform";
import { Attention } from "@/components/sections/Attention";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GettingStarted } from "@/components/sections/GettingStarted";
import { WhyMeraki } from "@/components/sections/WhyMeraki";
import { EarlyAccess } from "@/components/sections/EarlyAccess";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// Section order and ids: specs/01 §7.
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Outcomes />
      <Platform />
      <Attention />
      <Features />
      <HowItWorks />
      <GettingStarted />
      <WhyMeraki />
      <EarlyAccess />
      <Faq />
      <FinalCta />
    </>
  );
}
