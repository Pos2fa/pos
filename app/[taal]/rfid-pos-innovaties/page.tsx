import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import RfidKassaDiagram from "@/components/RfidKassaDiagram";
import { isTaal, pad } from "@/lib/i18n";

/**
 * Bijlage bij het tijdlijnitem "Heden — Afrekenen via de RFID-tag" op de
 * pagina Markt & innovatie: de volledige tekst van het document
 * "RFID POS-innovaties" dat de eigenaar heeft aangeleverd (versie van
 * 6 november 2026, inclusief zijn latere aanvulling). Alleen evidente
 * typefouten zijn gecorrigeerd (Declathon → Decathlon, Farady → Faraday).
 */
const UI = {
  nl: {
    metaTitel: "Ontwikkeling van RFID-technologie in de retail",
    metaBeschrijving:
      "Van de eerste beveiligingstags (1965) tot afrekenen via de RFID-tag bij Uniqlo en Decathlon: de POS-innovaties achter het RFID-afrekenen, en waarom de RFID-tag geen wondermiddel tegen winkeldiefstal is.",
    kicker: "Bijlage",
    titel: "Ontwikkeling van RFID-technologie in de retail",
    alineasIntro: [
      "Vanaf circa 1965 werden, ter voorkoming van winkeldiefstal, de eerste voorlopers van de beveiligingstags aan kledingstukken bevestigd. De eerste RFID-tag dateert van 1973, en sindsdien heeft de toepassing van RFID-technologie een grote vlucht genomen. Rond 2005 voorzagen de top-100-leveranciers van Walmart, om het voorraadbeheer te automatiseren, alle pallets en dozen voor het eerst van RFID-tags. Deze introductie werd wereldwijd in een razend tempo door de retail opgepikt.",
      "De fast-fashion-industrie, met Uniqlo en Decathlon als trendsetters, neemt sinds 2015 steeds meer stappen om de toepassing van de RFID-technologie leidend te maken voor al haar bedrijfsprocessen, waaronder 100% source-tagging. Dit leidt tot POS-innovaties die aardig beginnen te wringen met het Sunrise 2027-initiatief, waarmee wereldwijd de barcode vervangen gaat worden door de nieuwe GS1 Digital Link QR-code. Namelijk: grote internationale mode-, sport- en warenhuizen maken steeds meer gebruik van RFID-technologie bij het afrekenen aan de zelfscankassa's.",
      "Bij Uniqlo worden er al geen QR-codes meer bij de zelfscankassa of kassière ingelezen. Alles gaat via het inlezen van RFID-tags die gebruikmaken van de GS1 EPC-standaard, gecodeerd volgens het SGTIN-protocol. De chips in de RFID-tag maken gebruik van de GS1 EPC global UHF Class 1 Gen 2-standaard (ISO 18000-6C). Bij Decathlon kan er nog wel met de QR-code afgerekend worden. Het invoeren van deze nieuwe manier van afrekenen wordt mogelijk gemaakt door het toepassen van de volgende POS-innovaties:",
    ],
    innovaties: [
      {
        naam: "Anti-collisieprotocollen (Gen UHF RFID)",
        tekst:
          "De RFID-reader zendt signalen uit naar de chips en gebruikt slimme protocollen (zoals Slotted Aloha of Tree-walking). Hiermee bepalen de reader en de chip in welke volgorde ze antwoorden, zodat ze niet door elkaar praten of elkaar storen wanneer tientallen tags tegelijkertijd reageren.",
      },
      {
        naam: "Afgeschermde afrekenbak",
        tekst:
          "De kassa-unit of bak waar je het tasje met spullen in zet (Uniqlo), of je spullen los in gooit (Decathlon), is aan de binnenkant voorzien van materiaal dat radiosignalen tegenhoudt. Hierdoor leest de scanner alleen de producten die in de bak liggen en reageert hij niet op de kleding van de klant die ernaast staat om af te rekenen (het ‘kooi van Faraday’-principe).",
      },
    ],
    alineasVervolg: [
      "Hiermee wordt het voorheen door de klant zelf laten inscannen van de QR-codes vervangen door de RFID-tags op de boodschappen in de afrekenbak, die in één keer automatisch door de RFID-reader ingelezen worden. Echter, de manier waarop het signaleren van winkeldiefstal gebeurt is niet veranderd. Het alarm bij het poortje bij de uitgang gaat nog steeds af als de RFID-tag niet verwijderd of — zoals nu met de huidige RFID-technologie mogelijk is — niet gedeactiveerd is.",
      "Het nu kunnen deactiveren van de RFID-tag is een efficiëntieslag waarmee alleen de valse alarmen, veroorzaakt door het vergeten om handmatig de RFID-tags te verwijderen, geminimaliseerd worden. Echter: wie wil, kan nog steeds stelen. En dit gebeurt steeds meer door RFID-blokkering met aluminiumfolie. In Japan is de georganiseerde misdaad daar heel creatief in.",
    ],
    tweFaTitel: "Het verschil met de 2FA-antidiefstalmethode",
    alineas2fa: [
      "Het toepassen van het ‘kooi van Faraday’-principe maakt, bij het detecteren van de RFID-tag, in de beschreven 2FA-antidiefstalmethode ook een essentieel onderdeel uit. Het verschil met de afgeschermde afrekenbak van Uniqlo en Decathlon is dat hier niet alleen de boodschappen, maar ook de klant onder het bereik van de RFID-reader valt. En voor de goede orde: deze RFID-straling en de verwante NFC-technologie zijn niet schadelijk voor de gezondheid.",
      "De 2FA-‘kooi van Faraday’ is direct gekoppeld aan het kassasysteem en vervangt daarmee tevens de door Uniqlo en Decathlon gebruikte alarmpoorten die ergens los bij de uitgang staan. Als er een fout gemaakt wordt, zorgt tweefactorauthenticatie ervoor dat de klant pas kan afrekenen als deze fout hersteld is. In de tussentijd is het onmogelijk dat de klant alvast de boodschappen gaat inpakken en/of de winkel kan verlaten.",
      "Bij Uniqlo en Decathlon is de ‘kooi van Faraday’ het kassasysteem waarbij, na het scannen van de RFID-tags, de boodschappen zonder verdere noemenswaardige controle afgerekend worden. Daarna kan men net zo lang in de winkel blijven als men wil. Voor de kwaadwillenden is er dus voldoende gelegenheid om nog even verder te winkelen met een ‘booster bag’.",
      "Pas als bij het verlaten van de winkel het alarm afgaat, moet een bewaker maar zien de winkeldief in de kraag te vatten.",
    ],
    conclusieLabel: "Conclusie",
    conclusie:
      "De RFID-tag is geen wondermiddel tegen winkeldiefstal, maar wordt door de fast-fashion-industrie vooral gepositioneerd als een nieuwe klantvriendelijke manier om de boodschappen snel mee te kunnen afrekenen.",
    oplossingTitel: "De 2FA-oplossing voor de RFID-tag-afrekenmethode",
    alineasOplossing: [
      "Gelukkig biedt de gepatenteerde 2FA-antidiefstalmethode ook een oplossing voor de nieuwe RFID-tag-afrekenmethode. Namelijk: als aan alle elementen van claim 1 uit het patent wordt voldaan, kan de in claim 4 beschreven uitvoeringsvorm toegepast worden.",
      "De RFID-tags op de boodschappen uit de winkelwagen in de 2FA-‘kooi van Faraday’ worden nog wel gelezen zoals bij de zelfscankassa, maar nu als RFID-boodschappenlijst 1. Maar net zoals bij de zelfscankassa zijn de kunststof winkelwagentjes hier geschikter voor dan de metalen. Het zelfscannen van de boodschappen met de QR-code wordt vervangen door het nu in één keer inlezen van de RFID-tags als RFID-boodschappenlijst 2. Dit kan op een gelijksoortige manier zoals toegepast bij de Uniqlo-‘kooi van Faraday’.",
      "De nieuwe winkeldiefstalbestendige CPS-RFID-kassa ziet er dan als volgt uit. Situatie 4 van de 2 winkelwagens, zoals weergegeven voor de zelfscankassa, is dan niet meer nodig omdat de RFID-afrekensnelheid minstens zo snel is.",
    ],
    terug: "Terug naar Markt & innovatie",
  },
  en: {
    metaTitel: "The development of RFID technology in retail",
    metaBeschrijving:
      "From the first security tags (1965) to checkout via the RFID tag at Uniqlo and Decathlon: the POS innovations behind RFID checkout, and why the RFID tag is no miracle cure against shoplifting.",
    kicker: "Appendix",
    titel: "The development of RFID technology in retail",
    alineasIntro: [
      "From around 1965, to prevent shoplifting, the first forerunners of security tags were attached to garments. The first RFID tag dates from 1973, and since then the application of RFID technology has taken off. Around 2005, Walmart's top-100 suppliers fitted all pallets and boxes with RFID tags for the first time, in order to automate inventory management. This introduction was picked up by retail worldwide at a rapid pace.",
      "The fast-fashion industry, with Uniqlo and Decathlon as trendsetters, has been taking more and more steps since 2015 to make the application of RFID technology leading for all of its business processes, including 100% source tagging. This leads to POS innovations that are beginning to clash with the Sunrise 2027 initiative, under which the barcode will be replaced worldwide by the new GS1 Digital Link QR code. Namely: large international fashion, sports and department stores are increasingly using RFID technology for checkout at self-checkouts.",
      "At Uniqlo, QR codes are no longer read at the self-checkout or by the cashier at all. Everything works by reading RFID tags that use the GS1 EPC standard, encoded according to the SGTIN protocol. The chips in the RFID tag use the GS1 EPC global UHF Class 1 Gen 2 standard (ISO 18000-6C). At Decathlon it is still possible to pay with the QR code. The introduction of this new way of checking out is made possible by applying the following POS innovations:",
    ],
    innovaties: [
      {
        naam: "Anti-collision protocols (Gen UHF RFID)",
        tekst:
          "The RFID reader sends signals to the chips and uses smart protocols (such as Slotted Aloha or Tree-walking). These let the reader and the chip determine the order in which they respond, so that they do not talk over or interfere with each other when dozens of tags respond at the same time.",
      },
      {
        naam: "Shielded checkout bin",
        tekst:
          "The checkout unit or bin in which you place the bag with your items (Uniqlo), or into which you put your items loose (Decathlon), is lined on the inside with material that blocks radio signals. As a result, the scanner only reads the products in the bin and does not respond to the clothing of the customer standing next to it to pay (the ‘Faraday cage’ principle).",
      },
    ],
    alineasVervolg: [
      "With this, having the customer scan the QR codes themselves has been replaced by the RFID tags on the shopping in the checkout bin, which are automatically read in one go by the RFID reader. However, the way shoplifting is signalled has not changed. The alarm at the gate at the exit still goes off if the RFID tag has not been removed or — as is now possible with current RFID technology — has not been deactivated.",
      "Being able to deactivate the RFID tag is an efficiency gain that only minimises the false alarms caused by forgetting to remove the RFID tags manually. However: those who want to can still steal. And this is increasingly done through RFID blocking with aluminium foil. In Japan, organised crime is very creative at this.",
    ],
    tweFaTitel: "The difference with the 2FA anti-theft method",
    alineas2fa: [
      "Applying the ‘Faraday cage’ principle is also an essential part of detecting the RFID tag in the 2FA anti-theft method described on this website. The difference with the shielded checkout bin of Uniqlo and Decathlon is that here not only the shopping but also the customer falls within the range of the RFID reader. And for the record: this RFID radiation and the related NFC technology are not harmful to health.",
      "The 2FA ‘Faraday cage’ is directly linked to the checkout system and thereby also replaces the separate alarm gates used by Uniqlo and Decathlon that stand somewhere near the exit. If a mistake is made, two-factor authentication ensures that the customer can only pay once this mistake has been corrected. In the meantime, it is impossible for the customer to start packing the shopping and/or leave the store.",
      "At Uniqlo and Decathlon, the ‘Faraday cage’ is the checkout system where, after scanning the RFID tags, the shopping is paid for without any further checks worth mentioning. After that, people can stay in the store as long as they like. For those with bad intentions, there is therefore plenty of opportunity to continue shopping for a while with a ‘booster bag’.",
      "Only when the alarm goes off upon leaving the store does a security guard have to try to catch the shoplifter.",
    ],
    conclusieLabel: "Conclusion",
    conclusie:
      "The RFID tag is no miracle cure against shoplifting, but is positioned by the fast-fashion industry above all as a new, customer-friendly way to pay for the shopping quickly.",
    oplossingTitel: "The 2FA solution for the RFID-tag checkout method",
    alineasOplossing: [
      "Fortunately, the patented 2FA anti-theft method also offers a solution for the new RFID-tag checkout method. Namely: if all elements of claim 1 of the patent are met, the embodiment described in claim 4 can be applied.",
      "The RFID tags on the shopping from the trolley in the 2FA ‘Faraday cage’ are still read as at the self-checkout, but now as RFID shopping list 1. But just as with the self-checkout, plastic shopping trolleys are more suitable for this than metal ones. Self-scanning the shopping with the QR code is replaced by now reading the RFID tags in one go as RFID shopping list 2. This can be done in a similar way to that used in the Uniqlo ‘Faraday cage’.",
      "The new theft-proof CPS RFID checkout then looks as follows. Situation 4 with the 2 shopping trolleys, as shown for the self-checkout, is then no longer needed because the RFID checkout speed is at least as fast.",
    ],
    terug: "Back to Market & innovation",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[taal]/rfid-pos-innovaties">): Promise<Metadata> {
  const { taal } = await params;
  const ui = UI[isTaal(taal) ? taal : "nl"];
  return { title: ui.metaTitel, description: ui.metaBeschrijving };
}

export default async function RfidPosInnovatiesPage({
  params,
}: PageProps<"/[taal]/rfid-pos-innovaties">) {
  const { taal } = await params;
  if (!isTaal(taal)) notFound();
  const ui = UI[taal];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24">
        <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
          {ui.kicker}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-950 sm:text-5xl">
          {ui.titel}
        </h1>

        <Reveal className="mt-10">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
            {ui.alineasIntro.map((alinea, i) => (
              <p
                key={alinea.slice(0, 40)}
                className={`text-base leading-7 text-slate-700 ${i > 0 ? "mt-4" : ""}`}
              >
                {alinea}
              </p>
            ))}
            <ul className="mt-5 space-y-4">
              {ui.innovaties.map((innovatie) => (
                <li
                  key={innovatie.naam}
                  className="flex gap-3 text-base leading-7 text-slate-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                  />
                  <span>
                    <strong className="font-semibold text-slate-950">
                      {innovatie.naam}:
                    </strong>{" "}
                    {innovatie.tekst}
                  </span>
                </li>
              ))}
            </ul>
            {ui.alineasVervolg.map((alinea) => (
              <p
                key={alinea.slice(0, 40)}
                className="mt-4 text-base leading-7 text-slate-700"
              >
                {alinea}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
            <h2 className="text-2xl font-extrabold text-slate-950">
              {ui.tweFaTitel}
            </h2>
            {ui.alineas2fa.map((alinea) => (
              <p
                key={alinea.slice(0, 40)}
                className="mt-4 text-base leading-7 text-slate-700"
              >
                {alinea}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="rounded-2xl bg-blue-700 p-7 text-white sm:p-8">
            <h2 className="text-sm font-semibold tracking-wider uppercase">
              {ui.conclusieLabel}
            </h2>
            <p className="mt-3 text-lg leading-8 font-medium">{ui.conclusie}</p>
          </div>
        </Reveal>

        {/* Aanvulling van de eigenaar (9 nov 2026): de 2FA-oplossing voor de
            RFID-tag-afrekenmethode, met de drie aangepaste situatietekeningen
            van de CPS-RFID-kassa (zonder verklarende tekst onder de plaatjes) */}
        <Reveal className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
            <h2 className="text-2xl font-extrabold text-slate-950">
              {ui.oplossingTitel}
            </h2>
            {ui.alineasOplossing.map((alinea) => (
              <p
                key={alinea.slice(0, 40)}
                className="mt-4 text-base leading-7 text-slate-700"
              >
                {alinea}
              </p>
            ))}
            <div className="mt-8">
              <RfidKassaDiagram taal={taal} />
            </div>
          </div>
        </Reveal>

        <div className="mt-12">
          <Link
            href={pad(taal, "/markt")}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {ui.terug}
          </Link>
        </div>
      </div>
    </section>
  );
}
