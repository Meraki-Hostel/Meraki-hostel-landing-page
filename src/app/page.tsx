import { Hero } from "@/components/sections/Hero";
import { FlowHeroCard } from "@/components/sections/FlowHeroCard";
import { FlowSocialProof } from "@/components/sections/FlowSocialProof";
import { FlowSpeedShowcase } from "@/components/sections/FlowSpeedShowcase";
import { FlowMadeForYou } from "@/components/sections/FlowMadeForYou";
import { FlowSplitSpotlight } from "@/components/sections/FlowSplitSpotlight";
import { FlowBentoGrid } from "@/components/sections/FlowBentoGrid";
import { FlowLavenderBanner } from "@/components/sections/FlowLavenderBanner";
import { FlowLoveLetters } from "@/components/sections/FlowLoveLetters";
import { EarlyAccess } from "@/components/sections/EarlyAccess";
import { FlowHeroCta } from "@/components/sections/FlowHeroCta";
import { FlowFaqAndBanner } from "@/components/sections/FlowFaqAndBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <FlowHeroCard />
      <FlowSocialProof />
      <FlowSpeedShowcase />
      <FlowMadeForYou />
      <FlowSplitSpotlight />
      <FlowBentoGrid />
      <FlowLavenderBanner />
      <FlowLoveLetters />
      <EarlyAccess />
      <FlowHeroCta />
      <FlowFaqAndBanner />
    </>
  );
}
