import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getInhoud } from "@/lib/content";
import { isTaal, pad } from "@/lib/i18n";

const UI = {
  nl: {
    metaFallback: "Stappenplan",
    metaBeschrijving: (n: number) =>
      `Het volledige stappenplan van situatie ${n} van het CPS-zelfscankassasysteem.`,
    situatie: "Situatie",
    volgende: (n: number, titel: string) => `Volgende situatie ${n} – ${titel}`,
    naarMarkt: "Verder naar Markt & innovatie",
  },
  en: {
    metaFallback: "Step-by-step guide",
    metaBeschrijving: (n: number) =>
      `The full step-by-step guide of situation ${n} of the CPS self-checkout system.`,
    situatie: "Situation",
    volgende: (n: number, titel: string) => `Next situation ${n} – ${titel}`,
    naarMarkt: "On to Market & innovation",
  },
} as const;

export function generateStaticParams() {
  return [1, 2, 3, 4].map((n) => ({ situatie: `situatie-${n}` }));
}

function situatieNummer(param: string): number | null {
  const match = /^situatie-([1-4])$/.exec(param);
  return match ? Number(match[1]) : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/[taal]/stappenplannen/[situatie]">): Promise<Metadata> {
  const { taal, situatie } = await params;
  const ui = UI[isTaal(taal) ? taal : "nl"];
  const nummer = situatieNummer(situatie);
  if (!nummer || !isTaal(taal)) return { title: ui.metaFallback };
  const inhoud = await getInhoud(taal);
  const plan = inhoud.technologie.stappenplannen[nummer - 1];
  return {
    title: plan.titel,
    description: ui.metaBeschrijving(nummer),
  };
}

export default async function StappenplanPage({
  params,
}: PageProps<"/[taal]/stappenplannen/[situatie]">) {
  const { taal, situatie } = await params;
  if (!isTaal(taal)) notFound();
  const nummer = situatieNummer(situatie);
  if (!nummer) notFound();

  const { technologie } = await getInhoud(taal);
  const ui = UI[taal];
  const plan = technologie.stappenplannen[nummer - 1];
  // Terug naar de situatietabbalk op de technologiepagina (met de volgende
  // situatie actief), zodat de bulletpunten daar niet worden overgeslagen.
  const volgende =
    nummer < 4
      ? {
          href: pad(taal, `/technologie#situatie-${nummer + 1}`),
          label: ui.volgende(nummer + 1, technologie.situaties[nummer].titel),
        }
      : { href: pad(taal, "/markt"), label: ui.naarMarkt };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24">
        <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
          {ui.situatie} {nummer}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">
          {plan.titel}
        </h1>

        <ol className="mt-10 space-y-4">
          {plan.alineas.map((alinea, j) => (
            <li key={alinea.slice(0, 40)} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white"
              >
                {j + 1}
              </span>
              <p className="text-base leading-7 text-slate-600">{alinea}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 border-t border-slate-200 pt-6">
          <Link
            href={volgende.href}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            {volgende.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
