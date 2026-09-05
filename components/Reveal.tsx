"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Vertraging in ms voor gestaffelde animaties */
  delay?: number;
};

/**
 * Laat content subtiel infaden zodra deze in beeld scrolt.
 * Zonder JavaScript (of met prefers-reduced-motion) blijft alles direct
 * zichtbaar. Naast de IntersectionObserver draait een scroll-vangnet:
 * op trage of haperende apparaten (en bij snel doorscrollen) kan de
 * observer een overgang missen, waardoor een sectie anders onzichtbaar
 * zou blijven.
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    el.classList.add("reveal");
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }

    let klaar = false;
    let observer: IntersectionObserver | null = null;

    const toon = () => {
      if (klaar) return;
      klaar = true;
      el.classList.add("is-visible");
      observer?.disconnect();
      window.removeEventListener("scroll", opScroll);
      window.removeEventListener("resize", opScroll);
    };

    const inBeeld = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - 40 && rect.bottom > 0;
    };

    const opScroll = () => {
      if (!klaar && inBeeld()) toon();
    };

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) toon();
        }
      },
      // Drempel 0: ook secties die groter zijn dan het scherm (kleine
      // viewports, ingezoomde browsers) verschijnen zodra ze in beeld komen.
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);

    window.addEventListener("scroll", opScroll, { passive: true });
    window.addEventListener("resize", opScroll, { passive: true });
    if (inBeeld()) toon();

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", opScroll);
      window.removeEventListener("resize", opScroll);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
