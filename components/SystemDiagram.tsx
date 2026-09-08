import type { ReactNode } from "react";
import type { Taal } from "@/lib/i18n";

/**
 * Schematische weergave van het CPS-zelfscankassasysteem in vier situaties,
 * naar de tekening en aanwijzingen van de uitvinder:
 * - producten zijn afbeeldingen van echte boodschappen (brood, melk, cola,
 *   koffie) in realistische onderlinge verhoudingen
 *   (public/images/boodschappen.png, vrijstaand);
 * - beveiligingspoort en product stoppoort hebben een donkerblauw rondje op
 *   het draaipunt en een rechthoekig uiteinde; de privacy poort is een
 *   schuifdeur (beide kanten rechthoekig) die naar links dichtgaat, met
 *   rechts een vaste wand van twee zwarte lijnen;
 * - alle poorten hebben dezelfde kleur; de stand blijkt uit de positie
 *   (stoppoort open = rechtop rechts van de inpakplek, schuifdeur open =
 *   naar rechts geschoven);
 * - in- en uitgang zijn in alle situaties geheel open;
 * - de zwarte middellijn loopt door tot net onder de RFID-lijn en sluit
 *   haaks aan op de zijkant van de kassa (afgrenzing van de open ruimte);
 * - de blauwe RFID-lijn staat dicht bij de kassa en eindigt er iets onder.
 */

const NAVY = "#0c1a33";
const POORT = "#2563eb";
const GRIJS = "#e2e8f0";

const LABELS = {
  nl: {
    rfid: "RFID-tag lezer",
    inpak1: "INPAK",
    inpak2: "PLEK",
    stoppoort: "product stoppoort",
    beveiligingspoort: "beveiligingspoort",
    privacypoort: "privacy poort",
    camera: "CAMERA",
    kassa: "zelfscankassa",
    uitgang: "UITGANG",
    ingang: "INGANG",
    situatie: "Situatie",
    oudeKlant: "oude klant",
    nieuweKlant: "nieuwe klant",
  },
  en: {
    rfid: "RFID tag reader",
    inpak1: "PACKING",
    inpak2: "AREA",
    stoppoort: "product stop gate",
    beveiligingspoort: "security gate",
    privacypoort: "privacy gate",
    camera: "CAMERA",
    kassa: "self-checkout",
    uitgang: "EXIT",
    ingang: "ENTRANCE",
    situatie: "Situation",
    oudeKlant: "previous customer",
    nieuweKlant: "new customer",
  },
} as const;

type Labels = (typeof LABELS)[Taal];
type PoortStand = "open" | "dicht";

/* ── Bouwstenen ───────────────────────────────────────────── */

function Wand({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={NAVY} strokeWidth="2.5" />;
}

/** Klein omkaderd tekstlabel. */
function Kader({ cx, cy, tekst }: { cx: number; cy: number; tekst: string }) {
  const breedte = tekst.length * 5.9 + 12;
  return (
    <g>
      <rect
        x={cx - breedte / 2}
        y={cy - 9}
        width={breedte}
        height={18}
        rx={3}
        fill="#ffffff"
        stroke={NAVY}
        strokeWidth="1.5"
      />
      <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize="10.5" fontWeight={700} fill={NAVY}>
        {tekst}
      </text>
    </g>
  );
}

/** Winkelwagen van boven gezien, wijzend richting de uitgang (omhoog). */
function Winkelwagen({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={NAVY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <polygon
        points={`${x - 40},${y} ${x + 40},${y} ${x + 24},${y - 88} ${x - 24},${y - 88}`}
      />
      <line x1={x - 24} y1={y - 88} x2={x + 24} y2={y - 88} strokeWidth="6.5" />
      <line x1={x - 48} y1={y + 12} x2={x + 48} y2={y + 12} strokeWidth="4.5" />
      <line x1={x - 38} y1={y} x2={x - 44} y2={y + 12} />
      <line x1={x + 38} y1={y} x2={x + 44} y2={y + 12} />
    </g>
  );
}

/**
 * Afbeelding van echte boodschappen in realistische onderlinge verhoudingen:
 * een brood, een pak melk, een fles cola en een pak koffie
 * (vrijstaande foto, public/images/boodschappen.png, 640x309).
 * Onderkant van de groep ligt op y, gecentreerd rond cx.
 */
const BOODSCHAPPEN_BREEDTE = 79;
const BOODSCHAPPEN_HOOGTE = 79 * (309 / 640); // ≈ 38.1, beeldverhouding van de foto

function BoodschappenSet({ cx, y, schaal = 1 }: { cx: number; y: number; schaal?: number }) {
  const breedte = BOODSCHAPPEN_BREEDTE * schaal;
  const hoogte = BOODSCHAPPEN_HOOGTE * schaal;
  return (
    <image
      href="/images/boodschappen.png"
      x={cx - breedte / 2}
      y={y - hoogte}
      width={breedte}
      height={hoogte}
      preserveAspectRatio="xMidYMax meet"
    />
  );
}

/* ── Paneel ───────────────────────────────────────────────── */

type PaneelProps = {
  poorten: { privacy: PoortStand; stop: PoortStand };
  labels: Labels;
  toonInUitgang?: boolean;
  children?: ReactNode;
};

function Paneel({ poorten, labels, toonInUitgang = false, children }: PaneelProps) {
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

      {/* Zwarte middellijn: doorgetrokken tot net onder de RFID-lijn en
          haaks aansluitend op de zijkant van de kassa */}
      <polyline
        points="180,172 180,473 218,473 218,452"
        fill="none"
        stroke={NAVY}
        strokeWidth="2.5"
      />

      {/* Blauwe RFID-lijn: dicht bij de kassa, tot iets onder de kassa */}
      <line x1={206} y1={300} x2={206} y2={467} stroke={POORT} strokeWidth="4.5" />
      <text
        x={199}
        y={430}
        fontSize="11.5"
        fontWeight={700}
        fill={POORT}
        transform="rotate(-90 199 430)"
      >
        {labels.rfid}
      </text>

      {/* Inpakplek */}
      <rect x={200} y={30} width={120} height={100} fill={GRIJS} stroke="#cbd5e1" />
      <text x={260} y={62} textAnchor="middle" fontSize="14" fontWeight={800} fill={NAVY}>
        {labels.inpak1}
      </text>
      <text x={260} y={82} textAnchor="middle" fontSize="14" fontWeight={800} fill={NAVY}>
        {labels.inpak2}
      </text>

      {/* Product stoppoort: draaipunt (rondje) rechts, rechthoekig uiteinde links.
          Dicht: overlapt de bovenkant van de zwarte middellijn, zodat de
          poort echt aansluit. Open: rechtop rechts van de inpakplek. */}
      {poorten.stop === "dicht" ? (
        <g>
          <rect x={184} y={160} width={160} height={24} fill={POORT} />
          <text x={260} y={176} textAnchor="middle" fontSize="11.5" fontWeight={700} fill="#ffffff">
            {labels.stoppoort}
          </text>
          <circle cx={344} cy={172} r={8} fill={NAVY} />
        </g>
      ) : (
        <g>
          <rect x={322} y={34} width={24} height={138} fill={POORT} />
          <text
            x={334}
            y={103}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight={700}
            fill="#ffffff"
            transform="rotate(-90 334 103)"
          >
            {labels.stoppoort}
          </text>
          <circle cx={334} cy={170} r={8} fill={NAVY} />
        </g>
      )}

      {/* Beveiligingspoort: altijd dicht; draaipunt (rondje) links,
          rechthoekig uiteinde rechts */}
      <rect x={14} y={288} width={164} height={24} fill={POORT} />
      <text x={96} y={304} textAnchor="middle" fontSize="11.5" fontWeight={700} fill="#ffffff">
        {labels.beveiligingspoort}
      </text>
      <circle cx={16} cy={300} r={8} fill={NAVY} />

      {/* Privacy poort: schuifdeur (beide kanten rechthoekig), even lang als
          de beveiligings- en product stoppoort (160). Dicht: volledig links
          tegen de zwarte linkerwand (zoals de beveiligingspoort); de twee
          zwarte lijnen zijn doorgetrokken tot tegen de poort, met links op de
          bovenste lijn een pijlpunt als illustratie van de schuifrichting.
          Open: in de wandkoker rechts geschoven. */}
      {poorten.privacy === "dicht" ? (
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
          <line x1={266} y1={570} x2={344} y2={570} stroke={NAVY} strokeWidth="2.5" />
          <line x1={266} y1={582} x2={344} y2={582} stroke={NAVY} strokeWidth="2.5" />
          <rect x={264} y={564} width={80} height={24} fill={POORT} />
          <text x={304} y={580} textAnchor="middle" fontSize="10.5" fontWeight={700} fill="#ffffff">
            {labels.privacypoort}
          </text>
        </g>
      )}

      {/* CPS-zelfscankassa: kiosk met camera boven het scherm */}
      <text x={270} y={300} textAnchor="middle" fontSize="12.5" fontWeight={800} fill={NAVY}>
        {labels.camera}
      </text>
      <rect x={240} y={308} width={60} height={44} rx={4} fill={NAVY} />
      <rect x={246} y={314} width={48} height={28} rx={2} fill={POORT} opacity={0.85} />
      <rect x={218} y={348} width={104} height={104} rx={8} fill="#ffffff" stroke={NAVY} strokeWidth="2.5" />
      <line x1={238} y1={372} x2={302} y2={372} stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
      <text x={270} y={408} textAnchor="middle" fontSize="13" fontWeight={800} fill={NAVY}>
        CPS
      </text>
      <text x={270} y={426} textAnchor="middle" fontSize="10.5" fontWeight={600} fill={NAVY}>
        {labels.kassa}
      </text>

      {/* In-/uitgang alleen in situatie 1 */}
      {toonInUitgang && (
        <>
          <text x={17} y={40} fontSize="12.5" fontWeight={800} fill={NAVY}>
            {labels.uitgang}
          </text>
          <text x={17} y={576} fontSize="12.5" fontWeight={800} fill={NAVY}>
            {labels.ingang}
          </text>
        </>
      )}

      {children}
    </svg>
  );
}

/* ── De vier situaties ────────────────────────────────────── */

export default function SystemDiagram({
  panelen,
  taal,
}: {
  panelen: { titel: string; bijschrift: string }[];
  taal: Taal;
}) {
  const labels = LABELS[taal];
  const situaties: {
    poorten: PaneelProps["poorten"];
    toonInUitgang?: boolean;
    extra: ReactNode;
  }[] = [
    // Situatie 1: aanmelden — volle winkelwagen vlak voor de dichte
    // beveiligingspoort; privacy poort open (vrije kassa).
    {
      poorten: { privacy: "open", stop: "dicht" },
      toonInUitgang: true,
      extra: (
        <>
          <Winkelwagen x={96} y={410} />
          <BoodschappenSet cx={96} y={396} schaal={0.72} />
        </>
      ),
    },
    // Situatie 2: scannen en afrekenen — lege winkelwagen voor de
    // beveiligingspoort; gescande boodschappen tegen de product stoppoort.
    {
      poorten: { privacy: "dicht", stop: "dicht" },
      extra: (
        <>
          <Winkelwagen x={96} y={410} />
          <BoodschappenSet cx={264} y={222} />
        </>
      ),
    },
    // Situatie 3: inpakken — lege winkelwagen vlak voor de uitgang;
    // boodschappen op de inpakplek; stoppoort open (rechts van de
    // inpakplek) en privacy poort open.
    {
      poorten: { privacy: "open", stop: "open" },
      extra: (
        <>
          <Winkelwagen x={96} y={108} />
          <BoodschappenSet cx={260} y={126} />
        </>
      ),
    },
    // Situatie 4: 2 winkelwagens — nieuwe klant (leeg) voor de
    // beveiligingspoort met de boodschappen onder de dichte product
    // stoppoort; oude klant voor de uitgang met de boodschappen in de
    // winkelwagen.
    {
      poorten: { privacy: "dicht", stop: "dicht" },
      extra: (
        <>
          <Winkelwagen x={96} y={108} />
          <BoodschappenSet cx={96} y={94} schaal={0.72} />
          <Kader cx={96} cy={140} tekst={labels.oudeKlant} />
          <Winkelwagen x={96} y={410} />
          <Kader cx={96} cy={442} tekst={labels.nieuweKlant} />
          <BoodschappenSet cx={264} y={222} />
        </>
      ),
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {panelen.map((paneel, i) => (
        <figure key={paneel.titel} className="flex flex-col">
          <figcaption className="mb-2 text-center">
            <span className="block text-sm font-extrabold tracking-wider text-blue-700 uppercase">
              {labels.situatie} {i + 1}
            </span>
            <span className="block text-sm font-bold text-slate-900">
              {paneel.titel}
            </span>
          </figcaption>
          <Paneel
            poorten={situaties[i].poorten}
            labels={labels}
            toonInUitgang={situaties[i].toonInUitgang}
          >
            {situaties[i].extra}
          </Paneel>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {paneel.bijschrift}
          </p>
        </figure>
      ))}
    </div>
  );
}
