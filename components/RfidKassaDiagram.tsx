import type { ReactNode } from "react";
import type { Taal } from "@/lib/i18n";
import {
  NAVY,
  POORT,
  Wand,
  Winkelwagen,
  BoodschappenSet,
} from "@/components/SystemDiagram";

/**
 * De winkeldiefstalbestendige CPS-RFID-kassa in drie situaties: de tekening
 * van de technologie-pagina (SystemDiagram), aangepast volgens de
 * aanwijzingen van de uitvinder voor de RFID-tag-afrekenmethode:
 * - de product stoppoort is weg;
 * - de tekst "CPS zelfscankassa" is "CPS RFID-kassa" geworden;
 * - de camera zit nu onder de CPS-box;
 * - de CPS-box is twee keer zo groot en stelt de afgeschermde afrekenbak voor;
 * - de boodschappen zitten in situatie 1 en 3 in de winkelwagen en in
 *   situatie 2 in de afgeschermde afrekenbak;
 * - de inpakplek en de zwarte verticale middellijn zijn weg; op die plek
 *   staat in situatie 3 de winkelwagen;
 * - de tekst RFID-tag lezer staat met een blauwe horizontale lijn eronder
 *   vlak boven de afrekenbak; de CPS-tekst staat precies in het midden van
 *   de bak (zonder zwarte streep) en de boodschappen staan in situatie 1
 *   onder en in situatie 2 boven die tekst;
 * - elke situatie heeft een eigen titel en een verklarende tekst eronder.
 */

const LABELS = {
  nl: {
    rfid: "RFID-tag lezer",
    beveiligingspoort: "beveiligingspoort",
    privacypoort: "privacy poort",
    camera: "CAMERA",
    kassa: "RFID-kassa",
    uitgang: "UITGANG",
    ingang: "INGANG",
    situatie: "Situatie",
    panelen: [
      {
        titel: "Boodschappen plaatsen",
        tekst:
          "De winkelwagen is ingereden tot aan de beveiligingspoort. Via een druk van de klant op de startknop is de privacy poort door het systeem gesloten. Daarna heeft het systeem, ongemerkt voor de klant, alle RFID-tags die zich in de 2FA-‘kooi van Faraday’ bevinden automatisch ingelezen voor het aanmaken van boodschappenlijst 1. In de weergegeven situatie 1 wordt boodschappenlijst 2 aangemaakt.",
      },
      {
        titel: "Inlezen en betalen",
        tekst:
          "Na het automatisch inlezen van de RFID-tags op de door de klant in de ‘kooi van Faraday’-afrekenbak geplaatste boodschappen, heeft het systeem met succes de tweevoudige productauthenticatie uitgevoerd. In de weergegeven situatie 2 worden de boodschappen betaald, waarna het systeem de beveiligingspoort zal openen.",
      },
      {
        titel: "Overpakken boodschappen",
        tekst:
          "Direct nadat de klant de beveiligingspoort gepasseerd is, heeft het systeem deze weer gesloten en heeft de klant de boodschappen overgepakt van de afrekenbak naar de winkelwagen. In de weergegeven situatie 3 gaat de klant de winkel verlaten en is de CPS-RFID-kassa klaar voor een nieuwe klant.",
      },
    ],
  },
  en: {
    rfid: "RFID tag reader",
    beveiligingspoort: "security gate",
    privacypoort: "privacy gate",
    camera: "CAMERA",
    kassa: "RFID checkout",
    uitgang: "EXIT",
    ingang: "ENTRANCE",
    situatie: "Situation",
    panelen: [
      {
        titel: "Placing the shopping",
        tekst:
          "The shopping trolley has been driven in up to the security gate. When the customer presses the start button, the system closes the privacy gate. The system has then automatically read, unnoticed by the customer, all RFID tags inside the 2FA ‘Faraday cage’ to create shopping list 1. In situation 1 shown here, shopping list 2 is being created.",
      },
      {
        titel: "Reading and paying",
        tekst:
          "After automatically reading the RFID tags on the shopping placed by the customer in the ‘Faraday cage’ checkout bin, the system has successfully performed the two-factor product authentication. In situation 2 shown here, the shopping is paid for, after which the system will open the security gate.",
      },
      {
        titel: "Transferring the shopping",
        tekst:
          "Immediately after the customer has passed the security gate, the system has closed it again, and the customer has transferred the shopping from the checkout bin to the trolley. In situation 3 shown here, the customer is about to leave the store and the CPS RFID checkout is ready for a new customer.",
      },
    ],
  },
} as const;

type Labels = (typeof LABELS)[Taal];
type PoortStand = "open" | "dicht";

type PaneelProps = {
  privacy: PoortStand;
  labels: Labels;
  toonUitgang?: boolean;
  toonIngang?: boolean;
  children?: ReactNode;
};

function Paneel({
  privacy,
  labels,
  toonUitgang = false,
  toonIngang = false,
  children,
}: PaneelProps) {
  return (
    <svg
      viewBox="0 0 360 600"
      role="img"
      aria-hidden="true"
      className="w-full rounded-xl border border-slate-200 bg-white"
    >
      {/* Doorlooppad: linkerwand; in- en uitgang geheel open */}
      <Wand x1={12} y1={12} x2={12} y2={588} />

      {/* CPS-kassasysteem: buitenwanden */}
      <Wand x1={180} y1={12} x2={348} y2={12} />
      <Wand x1={348} y1={12} x2={348} y2={588} />

      {/* De oorspronkelijke RFID-tag lezer: van de beveiligingspoort tot
          aan de privacy poort — de hele ruimte van de 2FA-'kooi van
          Faraday' (zoals op de technologie-pagina) */}
      <line x1={192} y1={300} x2={192} y2={564} stroke={POORT} strokeWidth="4.5" />
      <text
        x={185}
        y={480}
        fontSize="11.5"
        fontWeight={700}
        fill={POORT}
        transform="rotate(-90 185 480)"
      >
        {labels.rfid}
      </text>

      {/* RFID-tag lezer: tekst met daaronder een blauwe horizontale lijn,
          vlak boven de afgeschermde afrekenbak */}
      <text
        x={274}
        y={212}
        textAnchor="middle"
        fontSize="11.5"
        fontWeight={700}
        fill={POORT}
      >
        {labels.rfid}
      </text>
      <line x1={208} y1={221} x2={340} y2={221} stroke={POORT} strokeWidth="4.5" />

      {/* Beveiligingspoort: altijd dicht; draaipunt (rondje) links,
          rechthoekig uiteinde rechts */}
      <rect x={14} y={288} width={164} height={24} fill={POORT} />
      <text x={96} y={304} textAnchor="middle" fontSize="11.5" fontWeight={700} fill="#ffffff">
        {labels.beveiligingspoort}
      </text>
      <circle cx={16} cy={300} r={8} fill={NAVY} />

      {/* Privacy poort: schuifdeur, zoals op de technologie-pagina */}
      {privacy === "dicht" ? (
        <g>
          <rect x={14} y={564} width={160} height={24} fill={POORT} />
          <text x={94} y={580} textAnchor="middle" fontSize="11.5" fontWeight={700} fill="#ffffff">
            {labels.privacypoort}
          </text>
          <line x1={181} y1={570} x2={344} y2={570} stroke={NAVY} strokeWidth="2.5" />
          <polygon points="174,570 182,566.4 182,573.6" fill={NAVY} />
          <line x1={174} y1={582} x2={344} y2={582} stroke={NAVY} strokeWidth="2.5" />
        </g>
      ) : (
        <g>
          <rect x={184} y={564} width={160} height={24} fill={POORT} />
          <text x={264} y={580} textAnchor="middle" fontSize="11.5" fontWeight={700} fill="#ffffff">
            {labels.privacypoort}
          </text>
        </g>
      )}

      {/* CPS-RFID-kassa: twee keer zo grote box die de afgeschermde
          afrekenbak voorstelt, met de camera eronder */}
      <rect x={208} y={230} width={132} height={208} rx={8} fill="#ffffff" stroke={NAVY} strokeWidth="2.5" />
      <text x={274} y={328} textAnchor="middle" fontSize="13" fontWeight={800} fill={NAVY}>
        CPS
      </text>
      <text x={274} y={346} textAnchor="middle" fontSize="10.5" fontWeight={600} fill={NAVY}>
        {labels.kassa}
      </text>
      <rect x={244} y={452} width={60} height={44} rx={4} fill={NAVY} />
      <rect x={250} y={458} width={48} height={28} rx={2} fill={POORT} opacity={0.85} />
      <text x={274} y={514} textAnchor="middle" fontSize="12.5" fontWeight={800} fill={NAVY}>
        {labels.camera}
      </text>

      {/* UITGANG in situatie 1; INGANG in situatie 3 (daar is de privacy
          poort open, zodat de tekst niet over de dichte poort valt) */}
      {toonUitgang && (
        <text x={17} y={40} fontSize="12.5" fontWeight={800} fill={NAVY}>
          {labels.uitgang}
        </text>
      )}
      {toonIngang && (
        <text x={17} y={576} fontSize="12.5" fontWeight={800} fill={NAVY}>
          {labels.ingang}
        </text>
      )}

      {children}
    </svg>
  );
}

/* ── De drie situaties ────────────────────────────────────── */

export default function RfidKassaDiagram({ taal }: { taal: Taal }) {
  const labels = LABELS[taal];
  const situaties: {
    privacy: PoortStand;
    toonUitgang?: boolean;
    toonIngang?: boolean;
    extra: ReactNode;
  }[] = [
    // Situatie 1: boodschappen plaatsen — winkelwagen voor de dichte
    // beveiligingspoort; privacy poort dicht (zoals in situatie 2); de
    // boodschappen staan onder de CPS RFID-kassa-tekst in de afrekenbak.
    {
      privacy: "dicht",
      toonUitgang: true,
      extra: (
        <>
          <Winkelwagen x={96} y={410} />
          <BoodschappenSet cx={274} y={425} />
        </>
      ),
    },
    // Situatie 2: inlezen en betalen — lege winkelwagen voor de
    // beveiligingspoort; de boodschappen staan boven de CPS
    // RFID-kassa-tekst in de afgeschermde afrekenbak.
    {
      privacy: "dicht",
      extra: (
        <>
          <Winkelwagen x={96} y={410} />
          <BoodschappenSet cx={274} y={302} />
        </>
      ),
    },
    // Situatie 3: klaar — de winkelwagen met de boodschappen erin staat op
    // de plek van de vroegere inpakplek; privacy poort open en de tekst
    // INGANG onderin (verhuisd uit situatie 1).
    {
      privacy: "open",
      toonIngang: true,
      extra: (
        <>
          <Winkelwagen x={264} y={120} />
          <BoodschappenSet cx={264} y={106} schaal={0.72} />
        </>
      ),
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {situaties.map((situatie, i) => (
        <figure key={i} className="flex flex-col">
          <figcaption className="mb-2 text-center">
            <span className="block text-sm font-extrabold tracking-wider text-blue-700 uppercase">
              {labels.situatie} {i + 1}
            </span>
            <span className="block text-sm font-bold text-slate-900">
              {labels.panelen[i].titel}
            </span>
          </figcaption>
          <Paneel
            privacy={situatie.privacy}
            labels={labels}
            toonUitgang={situatie.toonUitgang}
            toonIngang={situatie.toonIngang}
          >
            {situatie.extra}
          </Paneel>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {labels.panelen[i].tekst}
          </p>
        </figure>
      ))}
    </div>
  );
}
