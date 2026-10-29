"use client";

import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

export function HeroFlowAnimation() {
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const [animConfig, setAnimConfig] = useState({
    anim1Dur: "35s",
    anim2Dur: "50s",
    strokeWidth: "30",
  });

  // Responsive duration & stroke matching Wispr Flow script 60
  useEffect(() => {
    function updateResponsive() {
      if (window.innerWidth <= 480) {
        setAnimConfig({
          anim1Dur: "18s",
          anim2Dur: "22s",
          strokeWidth: "55",
        });
      } else if (window.innerWidth <= 768) {
        setAnimConfig({
          anim1Dur: "25s",
          anim2Dur: "35s",
          strokeWidth: "40",
        });
      } else {
        setAnimConfig({
          anim1Dur: "35s",
          anim2Dur: "50s",
          strokeWidth: "30",
        });
      }
    }

    updateResponsive();
    window.addEventListener("resize", updateResponsive);
    return () => window.removeEventListener("resize", updateResponsive);
  }, []);

  // Lottie player for the central Wispr Flow toast/waveform animation
  useEffect(() => {
    if (!lottieContainerRef.current) return;

    const anim = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/flow-header.json",
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div
      className="hero_animation-wrapper-v2 relative w-full overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* 1. Left Winding Ribbon (Spoken / Raw Operational Input Loop) */}
      <div className="hero_animation is-left small-size-desktop w-1/2">
        <svg
          id="hero-svg-left"
          viewBox="0 0 1048 594"
          width="100%"
          height="auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <path
            id="curve1"
            d="M0.597656 50.924805 C17.4612 143.2965 61.94 299.86 398.60 360.27 C594.00 395.31 772.77 285.92 668.74 149.27 C564.71 12.62 340.74 270.96 667.04 470.42 C719.69 506.55 817.468 561.26 1046.43 565.235"
            stroke="var(--color-line-strong)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-40"
          />
          <text x="-2947">
            <textPath id="marquee-text-hero1" href="#curve1">
              Umm, Room 104 tap is leaking again… also Rahul from 202 sent rent on Google Pay but forgot screenshot, and can someone check if bed 301-B is ready for move-in tomorrow? And meter reading for second floor is pending, plus Priya asked for deposit receipt… Umm, Room 104 tap is leaking again… also Rahul from 202 sent rent on Google Pay but forgot screenshot, and can someone check if bed 301-B is ready for move-in tomorrow? And meter reading for second floor is pending, plus Priya asked for deposit receipt…
            </textPath>
            <animate
              id="marquee1-anim"
              attributeName="x"
              dur={animConfig.anim1Dur}
              values="-2947; 0"
              repeatCount="indefinite"
            />
          </text>
        </svg>
      </div>

      {/* 2. Center Flow Engine: Glowing background + Lottie Toasts & Waveform + Floating Pill Badge */}
      <div className="hero_animation-lottie-bg" />
      <div
        ref={lottieContainerRef}
        className="hero_animation-lottie"
        style={{
          filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.12))",
        }}
      />
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-1 text-[11px] font-semibold text-on-dark shadow-lg ring-1 ring-white/20">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Synced to Ledger ✓</span>
        </span>
      </div>

      {/* 3. Right Polished Ribbon (Thick Dark Band with Crisp Output) */}
      <div className="hero_animation is-right small-size-desktop w-1/2">
        <svg
          id="hero-svg-right"
          viewBox="0 0 1024 620"
          width="100%"
          height="auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <path
            id="curve2"
            d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216"
            stroke="var(--color-dark-card)"
            strokeWidth={animConfig.strokeWidth}
            strokeLinecap="round"
          />
          <text x="-4018">
            <textPath id="marquee-text-hero2" href="#curve2">
              Room 104 maintenance ticket #208 logged. Rahul Sharma (Room 202) rent credited ₹8,500 via UPI; ledger updated. Bed 301-B verified ready; tenant KYC Aadhaar verified. Floor 2 electricity sub-meter recorded: 420 kWh. Priya deposit receipt generated and sent. Room 104 maintenance ticket #208 logged. Rahul Sharma (Room 202) rent credited ₹8,500 via UPI; ledger updated. Bed 301-B verified ready; tenant KYC Aadhaar verified. Floor 2 electricity sub-meter recorded: 420 kWh. Priya deposit receipt generated and sent.
            </textPath>
            <animate
              id="marquee2-anim"
              attributeName="x"
              dur={animConfig.anim2Dur}
              values="-4018; 0"
              repeatCount="indefinite"
            />
          </text>
        </svg>
      </div>
    </div>
  );
}
