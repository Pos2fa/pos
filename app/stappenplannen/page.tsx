import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getInhoud } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stappenplannen",
  description:
    "De volledige stappenplannen van de vier situaties van het CPS-zelfscankassasysteem: aanmelden, scannen en afrekenen, inpakken en het gebruik met twee winkelwagens.",
};

export default async function StappenplannenPage() {
  const { technologie } = await getInhoud();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24">
        <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
          De technologie
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-950 sm:text-5xl">
          Stappenplannen van de vier situaties
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          De tekening en de puntsgewijze samenvattingen tonen de essentie; deze
          stappenplannen beschrijven per situatie stap voor stap hoe het
          CPS-systeem precies handelt.
        </p>

        <div className="mt-12 space-y-8">
          {technologie.stappenplannen.map((plan, i) => (
            <Reveal key={plan.titel}>
              <article
                id={`situatie-${i + 1}`}
                className="scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8"
              >
                <p className="text-xs font-extrabold tracking-wider text-blue-700 uppercase">
                  Situatie {i + 1}
                </p>
                <h2 className="mt-1.5 text-2xl font-extrabold text-slate-950">
                  {plan.titel}
                </h2>
                <ol className="mt-5 space-y-4">
                  {plan.alineas.map((alinea, j) => (
                    <li key={alinea.slice(0, 40)} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white"
                      >
                        {j + 1}
                      </span>
                      <p className="text-base leading-7 text-slate-600">
                        {alinea}
                      </p>
                    </li>
                  ))}
                </ol>
                <p className="mt-6">
                  <Link
                    href="/technologie"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Terug naar de technologie
                  </Link>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
