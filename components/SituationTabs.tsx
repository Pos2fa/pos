"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, DoorOpen, ScanBarcode, PackageCheck, ShoppingCart } from "lucide-react";
import { pad, type Taal } from "@/lib/i18n";

const ICONEN = [DoorOpen, ScanBarcode, PackageCheck, ShoppingCart];

const UI = {
  nl: {
    tablijst: "De vier situaties van het CPS-zelfscankassasysteem",
    situatie: "Situatie",
    leesVerder: (n: number) =>
      `Lees verder: het volledige situatie ${n} stappenplan`,
    volgende: (n: number, titel: string) => `Volgende: situatie ${n} — ${titel}`,
    naarMarkt: "Verder naar Markt & innovatie",
  },
  en: {
    tablijst: "The four situations of the CPS self-checkout system",
    situatie: "Situation",
    leesVerder: (n: number) =>
      `Read on: the full situation ${n} step-by-step guide`,
    volgende: (n: number, titel: string) => `Next: situation ${n} — ${titel}`,
    naarMarkt: "On to Market & innovation",
  },
} as const;

export type Situatie = {
  titel: string;
  intro: string;
  punten: string[];
};

export default function SituationTabs({
  situaties,
  taal,
}: {
  situaties: Situatie[];
  taal: Taal;
}) {
  const [active, setActive] = useState(0);
  const current = situaties[active];
  const ui = UI[taal];
  const containerRef = useRef<HTMLDivElement>(null);

  // Deeplink vanuit de stappenplanpagina's: #situatie-N opent tab N en
  // scrolt naar de tabbalk, zodat de bulletpunten niet worden overgeslagen.
  useEffect(() => {
    const pasHashToe = () => {
      const match = /^#situatie-([1-4])$/.exec(window.location.hash);
      if (!match) return;
      setActive(Number(match[1]) - 1);
      // De browser scrolt zelf naar de tabknop met dit id; deze nazorg vangt
      // het geval dat de navigatie de scroll terugzet. Bewust 'instant'
      // ('auto' volgt de CSS-smooth-animatie, die in achtergrondtabbladen
      // wordt gepauzeerd; een directe sprong is bij paginawissel gebruikelijk).
      containerRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      }, 100);
    };
    pasHashToe();
    window.addEventListener("hashchange", pasHashToe);
    return () => window.removeEventListener("hashchange", pasHashToe);
  }, []);

  return (
    <div ref={containerRef} id="situaties" className="scroll-mt-24">
      <div
        role="tablist"
        aria-label={ui.tablijst}
        className="grid grid-cols-2 gap-2 lg:grid-cols-4"
      >
        {situaties.map((situatie, i) => {
          const Icon = ICONEN[i % ICONEN.length];
          const selected = i === active;
          return (
            <button
              key={situatie.titel}
              role="tab"
              id={`situatie-${i + 1}`}
              aria-selected={selected}
              aria-controls={`situatie-paneel-${i + 1}`}
              onClick={() => setActive(i)}
              className={`flex scroll-mt-24 cursor-pointer flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${
                selected
                  ? "border-blue-700 bg-blue-700 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              <span
                className={`text-xs font-semibold tracking-wider uppercase ${
                  selected ? "text-blue-200" : "text-blue-700"
                }`}
              >
                {ui.situatie} {i + 1}
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {situatie.titel}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`situatie-paneel-${active + 1}`}
        aria-labelledby={`situatie-${active + 1}`}
        className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <p className="text-base font-medium text-slate-900">{current.intro}</p>
        <ul className="mt-5 space-y-3">
          {current.punten.map((punt) => (
            <li key={punt} className="flex gap-3 text-sm leading-6 text-slate-600">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
              />
              {punt}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <Link
            href={pad(taal, `/stappenplannen/situatie-${active + 1}`)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            {ui.leesVerder(active + 1)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {active < situaties.length - 1 ? (
            <button
              type="button"
              onClick={() => setActive(active + 1)}
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              {ui.volgende(active + 2, situaties[active + 1].titel)}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <Link
              href={pad(taal, "/markt")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              {ui.naarMarkt}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
