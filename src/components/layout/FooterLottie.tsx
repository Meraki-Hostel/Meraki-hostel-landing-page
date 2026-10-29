"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export function FooterLottie() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/flow-footer.json",
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="size-10 sm:size-14 md:size-16 shrink-0 opacity-80"
      aria-hidden="true"
    />
  );
}
