import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, Handshake, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getInhoud } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Interesse in het patent of een licentiesamenwerking rond de 2FA-antidiefstalmethode voor zelfscankassa's? Neem contact op via info@pos-2fa-intermediary.com.",
};

export default async function ContactPage() {
  const inhoud = await getInhoud();
  const { contact } = inhoud;

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-extrabold text-slate-950 sm:text-5xl">
              {contact.titel}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {contact.tekst}
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col items-start rounded-3xl border border-blue-200 bg-blue-50 p-8 sm:p-10">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-md">
                  <Mail className="h-7 w-7" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-slate-950">
                  {contact.mailTitel}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {contact.mailTekst}
                </p>
                <a
                  href={`mailto:${inhoud.algemeen.contactEmail}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
                >
                  {inhoud.algemeen.contactEmail}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex h-full flex-col gap-5">
                <div className="flex flex-1 items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-7">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                    <FileCheck2 className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {contact.patentKaartTitel}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {contact.patentKaartTekst}
                    </p>
                    <Link
                      href="/patent"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
                    >
                      Lees meer
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-1 items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-7">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                    <Handshake className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {contact.partnersTitel}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {contact.partnersTekst}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
