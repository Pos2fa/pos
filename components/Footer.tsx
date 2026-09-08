import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import { getInhoud } from "@/lib/content";
import { pad, type Taal } from "@/lib/i18n";

const UI = {
  nl: {
    footernav: "Footernavigatie",
    navigatie: "Navigatie",
    links: [
      { route: "/", label: "Home" },
      { route: "/technologie", label: "De technologie" },
      { route: "/markt", label: "Markt & innovatie" },
      { route: "/patent", label: "Patent & samenwerking" },
      { route: "/contact", label: "Contact" },
    ],
    contact: "Contact",
    interesse: "Interesse in het patent of een licentie­samenwerking?",
    rechten: "Alle rechten voorbehouden.",
    patent: "Patent",
  },
  en: {
    footernav: "Footer navigation",
    navigatie: "Navigation",
    links: [
      { route: "/", label: "Home" },
      { route: "/technologie", label: "The technology" },
      { route: "/markt", label: "Market & innovation" },
      { route: "/patent", label: "Patent & partnership" },
      { route: "/contact", label: "Contact" },
    ],
    contact: "Contact",
    interesse: "Interested in the patent or a licensing partnership?",
    rechten: "All rights reserved.",
    patent: "Patent",
  },
} as const;

export default async function Footer({ taal }: { taal: Taal }) {
  const inhoud = await getInhoud(taal);
  const ui = UI[taal];
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo variant="light" className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              {inhoud.algemeen.footerTagline}
            </p>
          </div>

          <nav aria-label={ui.footernav}>
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
              {ui.navigatie}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {ui.links.map((link) => (
                <li key={link.route}>
                  <Link
                    href={pad(taal, link.route)}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
              {ui.contact}
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">{ui.interesse}</p>
            <a
              href={`mailto:${inhoud.algemeen.contactEmail}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-blue-300"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {inhoud.algemeen.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} POS-2FA-Intermediary. {ui.rechten}
          </p>
          <p>
            {ui.patent}: &ldquo;{inhoud.algemeen.patentTitel}&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
