"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, DoorOpen, ScanBarcode, PackageCheck, ShoppingCart } from "lucide-react";

const ICONEN = [DoorOpen, ScanBarcode, PackageCheck, ShoppingCart];

export type Situatie = {
  titel: string;
  intro: string;
  punten: string[];
};

export default function SituationTabs({
  situaties,
}: {
  situaties: Situatie[];
}) {
  const [active, setActive] = useState(0);
  const current = situaties[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="De vier situaties van het CPS-zelfscankassasysteem"
        className="grid grid-cols-2 gap-2 lg:grid-cols-4"
      >
        {situaties.map((situatie, i) => {
          const Icon = ICONEN[i % ICONEN.length];
          const selected = i === active;
          return (
            <button
              key={situatie.titel}
              role="tab"
              id={`situatie-tab-${i + 1}`}
              aria-selected={selected}
              aria-controls={`situatie-paneel-${i + 1}`}
              onClick={() => setActive(i)}
              className={`flex cursor-pointer flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${
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
                Situatie {i + 1}
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
        aria-labelledby={`situatie-tab-${active + 1}`}
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

        <div className="mt-6 flex justify-end border-t border-slate-100 pt-4">
          {active < situaties.length - 1 ? (
            <button
              type="button"
              onClick={() => setActive(active + 1)}
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Volgende: situatie {active + 2} — {situaties[active + 1].titel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <Link
              href="/markt"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Verder naar Markt &amp; innovatie
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
