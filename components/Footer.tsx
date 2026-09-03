import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import { getInhoud } from "@/lib/content";

export default async function Footer() {
  const inhoud = await getInhoud();
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

          <nav aria-label="Footernavigatie">
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
              Navigatie
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/technologie"
                  className="transition-colors hover:text-white"
                >
                  De technologie
                </Link>
              </li>
              <li>
                <Link href="/markt" className="transition-colors hover:text-white">
                  Markt &amp; innovatie
                </Link>
              </li>
              <li>
                <Link href="/patent" className="transition-colors hover:text-white">
                  Patent &amp; samenwerking
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
              Contact
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Interesse in het patent of een licentie&shy;samenwerking?
            </p>
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
            &copy; {new Date().getFullYear()} POS-2FA-Intermediary. Alle rechten
            voorbehouden.
          </p>
          <p>Patent: &ldquo;{inhoud.algemeen.patentTitel}&rdquo;</p>
        </div>
      </div>
    </footer>
  );
}
