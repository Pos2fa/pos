"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { pad, type Taal } from "@/lib/i18n";

const UI = {
  nl: {
    links: [
      { route: "/", label: "Home" },
      { route: "/technologie", label: "De technologie" },
      { route: "/markt", label: "Markt & innovatie" },
      { route: "/patent", label: "Patent & samenwerking" },
    ],
    contact: "Neem contact op",
    naarHome: "POS-2FA-Intermediary — naar de homepagina",
    hoofdnav: "Hoofdnavigatie",
    mobieleNav: "Mobiele navigatie",
    menuSluiten: "Menu sluiten",
    menuOpenen: "Menu openen",
    taalkeuze: "Taalkeuze",
    wisselNl: "Nederlands",
    wisselEn: "English",
  },
  en: {
    links: [
      { route: "/", label: "Home" },
      { route: "/technologie", label: "The technology" },
      { route: "/markt", label: "Market & innovation" },
      { route: "/patent", label: "Patent & partnership" },
    ],
    contact: "Contact us",
    naarHome: "POS-2FA-Intermediary — to the homepage",
    hoofdnav: "Main navigation",
    mobieleNav: "Mobile navigation",
    menuSluiten: "Close menu",
    menuOpenen: "Open menu",
    taalkeuze: "Language",
    wisselNl: "Nederlands",
    wisselEn: "English",
  },
} as const;

/** NL | EN-schakelaar die naar dezelfde pagina in de andere taal linkt. */
function Taalwissel({ taal, ui }: { taal: Taal; ui: (typeof UI)[Taal] }) {
  const pathname = usePathname();
  const kaalPad = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return (
    <div
      aria-label={ui.taalkeuze}
      className="inline-flex items-center overflow-hidden rounded-lg border border-slate-300 text-xs font-bold"
    >
      <Link
        href={kaalPad}
        aria-current={taal === "nl" ? "true" : undefined}
        lang="nl"
        title={ui.wisselNl}
        className={`px-2.5 py-1.5 transition-colors ${
          taal === "nl"
            ? "bg-navy-950 text-white"
            : "bg-white text-slate-600 hover:bg-slate-100"
        }`}
      >
        NL
      </Link>
      <Link
        href={kaalPad === "/" ? "/en" : `/en${kaalPad}`}
        aria-current={taal === "en" ? "true" : undefined}
        lang="en"
        title={ui.wisselEn}
        className={`px-2.5 py-1.5 transition-colors ${
          taal === "en"
            ? "bg-navy-950 text-white"
            : "bg-white text-slate-600 hover:bg-slate-100"
        }`}
      >
        EN
      </Link>
    </div>
  );
}

export default function Header({ taal }: { taal: Taal }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ui = UI[taal];
  const links = ui.links.map((link) => ({
    href: pad(taal, link.route),
    label: link.label,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href={pad(taal, "/")}
          className="flex shrink-0 items-center"
          aria-label={ui.naarHome}
          onClick={() => setOpen(false)}
        >
          <Logo className="h-11 w-auto" />
        </Link>

        <nav aria-label={ui.hoofdnav} className="hidden items-center gap-2 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors ${
                  active ? "bg-blue-900" : "bg-blue-700 hover:bg-blue-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={pad(taal, "/contact")}
            className="mr-3 rounded-lg bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
          >
            {ui.contact}
          </Link>
          <Taalwissel taal={taal} ui={ui} />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Taalwissel taal={taal} ui={ui} />
          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? ui.menuSluiten : ui.menuOpenen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobiel-menu"
          aria-label={ui.mobieleNav}
          className="border-t border-slate-200 bg-white px-4 pt-2 pb-4 lg:hidden"
        >
          <ul className="flex flex-col gap-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-base font-semibold text-white ${
                      active ? "bg-blue-900" : "bg-blue-700 hover:bg-blue-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href={pad(taal, "/contact")}
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-blue-700 px-4 py-3 text-center text-base font-semibold text-white hover:bg-blue-800"
              >
                {ui.contact}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
