/**
 * Alle bewerkbare teksten van de website, met de originele documentteksten
 * als standaardwaarde. De beheeromgeving (/beheer) toont deze structuur als
 * formulier; opgeslagen wijzigingen worden er overheen gelegd (zie lib/content.ts).
 *
 * Alleen string-velden — structuur (aantallen kaarten, stappen, situaties)
 * ligt vast omdat de pagina's iconen en lay-out per positie bepalen.
 */
export const standaardInhoud = {
  algemeen: {
    footerTagline:
      "Proactieve diefstalpreventie voor zelfscankassa's door tweevoudige artikelauthenticatie (2FA) met dual-technology.",
    contactEmail: "info@pos-2fa-intermediary.com",
    patentTitel: "Method and System for self-checkout at a point of sale",
  },

  home: {
    heroBadge: "Gepatenteerde dual-technology · 2FA",
    heroTitel:
      "Proactief beveiligen maakt einde aan winkeldiefstal bij zelfscankassa’s",
    heroTekst:
      "Steekproeven, exit-gates, camera’s en AI-systemen kunnen fraude signaleren, maar voorkomen deze niet. POS-2FA-Intermediary ontwikkelde een antidiefstalmethode die het probleem bij de bron aanpakt: tweevoudige artikelauthenticatie met QR-codes én RFID-tags.",
    statistieken: [
      {
        waarde: "€ 1 miljard",
        tekst:
          "geschatte jaarlijkse schade voor de Nederlandse retail door diefstal bij zelfscankassa’s",
      },
      {
        waarde: "1% → 2%",
        tekst:
          "verdubbeling van de dervingsschade in de supermarktsector sinds de grootschalige invoering van de zelfscan",
      },
      {
        waarde: "40.000",
        tekst:
          "winkeldiefstallen die de politie in 2025 nog registreerde — van de honderdduizenden, volgens onderzoek van het ministerie van Justitie en Veiligheid",
      },
    ],
    probleemTitel: "Reactieve maatregelen signaleren wel, maar voorkomen niet",
    probleemTekst:
      "De retail werd door de toegenomen derving genoodzaakt tot ingrijpende antidiefstalmaatregelen. Die blijken echter niet effectief, privacygevoelig en tamelijk klantonvriendelijk. Winkeldiefstal bij zelfscankassa’s is alleen effectief op te lossen door het afrekenen tijdens het scannen zélf betrouwbaar te maken.",
    probleemKaarten: [
      {
        titel: "Steekproeven & exit-gates",
        tekst:
          "Controleren pas achteraf, zorgen regelmatig voor frustratie bij goedwillende klanten en houden diefstal niet tegen.",
      },
      {
        titel: "Camera's & AI-systemen",
        tekst:
          "Kunnen fraude signaleren, maar voorkomen deze niet — en roepen bovendien vragen op over privacy.",
      },
      {
        titel: "Personeel als politieagent",
        tekst:
          "Voor winkelpersoneel is het moeten spelen voor politieagent hoogst confronterend.",
      },
      {
        titel: "Terugtrekkende politie",
        tekst:
          "De politie trekt zich steeds verder terug uit de civiele afhandeling van winkeldiefstal — het handhavingsprobleem wordt steeds nijpender.",
      },
    ],
    oplossingTitel:
      "Van reactieve naar proactieve preventie: voorkomen in plaats van achteraf controleren",
    oplossingTekst:
      "Een specifiek ontwikkeld Cyber-Physical System (CPS) vergelijkt tijdens het afrekenen de QR-codes op de verpakkingen met de extra bijgeplaatste RFID-tags: tweevoudige artikelauthenticatie (2FA) in drie stappen.",
    stappen: [
      {
        titel: "RFID-scan op afstand",
        tekst:
          "Zodra de klant zich bij de zelfscankassa aanmeldt, worden alle boodschappen in het mandje of de winkelwagen in één keer automatisch gescand door de ingebouwde RFID-lezer. Het CPS-programma maakt hiervan de RFID-boodschappenlijst: de referentielijst.",
      },
      {
        titel: "Klant scant de QR-codes",
        tekst:
          "De klant scant de boodschappen zoals ze gewend is één voor één en plaatst ze op een loopband die ze naar de inpakplek voert. Het CPS-programma bouwt gelijktijdig de QR-boodschappenlijst op.",
      },
      {
        titel: "2FA-validatie via het CPS",
        tekst:
          "Het CPS-programma vergelijkt beide lijsten simultaan. Ontbreekt een product of is iets niet correct gescand, dan krijgt de klant via het beeldscherm aanwijzingen. Pas na correctie kan de betaling worden afgerond.",
      },
    ],
    kassiereNoot:
      "In feite doet het CPS wat voorheen de kassière deed: in de winkelwagen kijken of alles is afgerekend en de boodschappen naar de inpakplek verplaatsen. Zo kan de doorlooptijd per zelfscankassa worden gehalveerd.",
    voordelenTitel: "Een win-win voor retailer én consument",
    voordelen: [
      {
        titel: "Diefstal voorkomen bij de bron",
        tekst:
          "Robuuste, continue en geautomatiseerde controle door het CPS — in plaats van een kostbaar en moeilijk te handhaven netwerk van repressieve maatregelen.",
      },
      {
        titel: "Klantvriendelijk en privacybewust",
        tekst:
          "Ad-hoc steekproeven en andere onbetrouwbare, klantonvriendelijke en privacygevoelige beveiligingsmethoden behoren tot het verleden.",
      },
      {
        titel: "Snellere doorstroming",
        tekst:
          "De loopband en de product stoppoort maken het mogelijk dat twee klanten dezelfde kassa tegelijk gebruiken: de doorlooptijd per zelfscankassa halveert.",
      },
      {
        titel: "Statiegeldinname aan de kassa",
        tekst:
          "Met een aanpassing van de CPS-programmatuur dient iedere beveiligde zelfscankassa ook als innamepunt voor statiegeldverpakkingen.",
      },
      {
        titel: "Goed voor het verdienmodel",
        tekst:
          "De exorbitante derving bij de zelfscankassa wordt proactief voorkomen — en de beoogde besparingen van de zelfscan worden alsnog gehaald.",
      },
      {
        titel: "Verlicht de handhavingsdruk",
        tekst:
          "Een proactieve aanpak is tevens een geschikte oplossing voor het steeds nijpender wordende handhavingsprobleem rond winkeldiefstal.",
      },
    ],
    ctaTitel: "Patent als basis voor samenwerking",
    ctaTekst:
      "POS-2FA-Intermediary zoekt een strategische koper of licentiepartner die de gepatenteerde technologie wereldwijd kan implementeren.",
  },

  technologie: {
    introTitel: "De proactieve, met dual-technology beveiligde zelfscankassa",
    introTekst1:
      "Met de ontwikkelingen in de RFID-technologie anno 2026 is het heel goed mogelijk om tijdens het afrekenen van de boodschappen de exorbitante, door winkeldiefstal veroorzaakte derving bij de zelfscankassa proactief te voorkomen. Daarmee vervalt tevens de noodzaak tot een kostbaar en moeilijk te handhaven justitioneel netwerk van repressieve maatregelen.",
    introTekst2:
      "De kern: een specifiek ontwikkeld Cyber-Physical System (CPS) vergelijkt tijdens het afrekenen de QR-codes op de verpakkingen met de extra bijgeplaatste RFID-tags — tweevoudige artikelauthenticatie (2FA).",
    stappenTitel: "Zo reduceert het CPS de derving in drie stappen",
    stappen: [
      {
        titel: "RFID-scan op afstand",
        tekst:
          "Zodra de klant zich bij de zelfscankassa aanmeldt, worden alle boodschappen in het mandje of de winkelwagen in één keer automatisch gescand via een in het kassasysteem ingebouwde RFID-lezer. Het CPS-programma maakt hiervan een RFID-boodschappenlijst die wordt opgeslagen in het kassasysteem: de referentielijst waaraan de door de klant te scannen boodschappen worden getoetst.",
      },
      {
        titel: "Klant scant de QR-codes",
        tekst:
          "De klant scant de boodschappen, zoals ze gewend is, één voor één bij de zelfscankassa en plaatst deze zelf op een loopband die de boodschappen naar de inpakplek voert. Het CPS-programma bouwt op basis van deze handmatige scans gelijktijdig een QR-boodschappenlijst op die eveneens in het kassasysteem wordt opgeslagen.",
      },
      {
        titel: "2FA-validatie via het CPS-programma",
        tekst:
          "Het CPS-programma vergelijkt beide boodschappenlijsten simultaan. Ontbreekt een product, of is iets niet correct gescand, dan krijgt de klant via het beeldscherm aanwijzingen hoe dit te corrigeren. Pas na correctie kan de betaling worden afgerond, kunnen de boodschappen worden ingepakt en kan de winkel worden verlaten.",
      },
    ],
    verschilTitel: "Het fundamentele verschil met de huidige zelfscankassa",
    verschilTekst:
      "In feite is de 2FA-validatie analoog aan wat de kassière vroeger deed. Alleen kijkt nu het CPS — in plaats van de kassière — in de winkelwagen of er nog boodschappen afgerekend moeten worden, en verplaatst het CPS de boodschappen naar de inpakplek aan de andere kant van de kassa. Daarmee kan de doorlooptijd per zelfscankassa worden gehalveerd.",
    huidigeKassaPunten: [
      "Boodschappen worden — na het al of niet scannen van de QR-code — teruggezet in de winkelwagen of direct ingepakt in de boodschappentas.",
      "Vervolgens wordt, via het al of niet tonen van een kassabon, al of niet legaal de winkel verlaten.",
      "Controle gebeurt achteraf en steekproefsgewijs — frustrerend voor de goedwillende klant, hét chagrijnonderwerp aan de borreltafel.",
    ],
    cpsKassaPunten: [
      "Ieder gescand product gaat direct op de loopband naar de inpakplek — niets verdwijnt ongecontroleerd in tas of winkelwagen.",
      "De continue en geautomatiseerde 2FA-controle vervangt ad-hoc steekproeven en alle andere onbetrouwbare, klantonvriendelijke en privacygevoelige methoden.",
      "Een robuuste oplossing die winkeldiefstal bij de zelfscankassa voorkomt — goed voor het verdienmodel van de retailer én de gemoedsrust van de consument.",
    ],
    systeemTitel:
      "Het winkeldiefstalbestendige CPS-zelfscankassasysteem in beeld",
    systeemTekst:
      "Het in het patent “Method and System for self-checkout at a point of sale” beschreven Cyber-Physical System stuurt de beveiligingspoort, de privacy poort en de product stoppoort aan, en combineert camera, RFID-lezer en QR-scanner. Vier situaties beschrijven de volledige werking — van aanmelden tot verlaten van de winkel.",
    diagramBijschrift:
      "De vier situaties van het CPS-zelfscankassasysteem, zoals beschreven in het patent. Het systeem is na iedere transactie direct klaar voor een nieuwe klant.",
    situaties: [
      {
        titel: "Aanmelden bij de kassa",
        intro:
          "De vrije kassa is te herkennen aan de open privacy poort. De klant rijdt met de winkelwagen naar binnen, tot aan de gesloten beveiligingspoort.",
        punten: [
          "De beveiligingspoort kan maar op twee manieren geopend worden: door een winkelbediende, of door het CPS-systeem — na het afrekenen, of wanneer een klant de winkel zonder aankopen wil verlaten.",
          "Wie de winkel zonder aankopen wil verlaten drukt op de knop ‘ik wil de winkel verlaten’. De privacy poort en de product stoppoort sluiten; de camera controleert winkelwagen of mandje, terwijl de RFID-lezer controleert of er producten met een RFID-code aanwezig zijn.",
          "Bevat de winkelwagen producten, dan vraagt het systeem of de klant wil afrekenen of de producten wil retourneren. Bij retour begeleidt het systeem de klant stap voor stap en wordt een winkelbediende opgeroepen voor assistentie.",
          "Worden er wel RFID-codes gedetecteerd bij een lege winkelwagen, of producten zonder enige RFID-code, dan wordt direct de beveiliging ingeschakeld: er is dan mogelijk sprake van voorgenomen fraude of gedeactiveerde tags.",
          "Klanten die met de app of handscanner hebben gescand, rekenen af via een aparte zuil. De RFID-scanner controleert daar eerst of alle producten daadwerkelijk gescand zijn.",
          "Afrekenen kan alleen individueel of als groep — het ‘geitenpaadje’ om achter wachtende klanten langs de winkel uit te lopen bestaat niet meer.",
        ],
      },
      {
        titel: "Scannen en afrekenen",
        intro:
          "Het sluiten van de privacy poort waarborgt de privacy van de klant én voorkomt een open verbinding met de winkel zodra de beveiligingspoort opent.",
        punten: [
          "Na een druk op de knop ‘ik wil gaan afrekenen’ controleert de camera de winkelwagen en leest de RFID-lezer alle RFID-codes in één keer in: de RFID-boodschappenlijst.",
          "De klant scant vervolgens de producten één voor één. Bij iedere scan controleert het CPS-systeem of het product op de RFID-boodschappenlijst staat én of de QR-code overeenkomt met de unieke code in de voorraadbeheerdatabase van de winkel.",
          "Een product dat de klant zelf al bij binnenkomst bezat, wordt herkend en uit de RFID-boodschappenlijst verwijderd. Staat een gescand product niet op de lijst, dan wordt de beveiliging gewaarschuwd — bijvoorbeeld bij een beschadigde RFID-code.",
          "Na iedere geslaagde controle wordt de RFID-tag-decoder geactiveerd; daarna mag het volgende product gescand worden. De klant plaatst het gescande product op de band.",
          "Na de knop ‘einde scan’ kan er betaald worden met de betaalmethode naar keuze. Blijkt uit de camera en de RFID-lijst dat er nog producten onbetaald zijn, dan wordt de beveiliging ingeschakeld.",
          "Afbreken kan uitsluitend via de knop ‘producten retour’ — bijvoorbeeld wanneer een klant besluit bepaalde producten niet te kopen, of bij een kassa met een maximum aantal producten.",
        ],
      },
      {
        titel: "Verlaten van de winkel",
        intro:
          "Zodra de betaling is afgerond opent de beveiligingspoort om de klant met de lege winkelwagen door te laten — en sluit direct daarna weer, gecontroleerd door de camera.",
        punten: [
          "Tegelijkertijd gaan de product stoppoort en de privacy poort open. De afgerekende boodschappen worden via de loopband naar de inpakplek achter de product stoppoort gevoerd.",
          "De klant pakt daar rustig de boodschappen in, buiten de kassazone.",
          "De camera signaleert wanneer de klant samen met de winkelwagen de uitgang heeft verlaten. Het CPS-systeem sluit de transactie af en is klaar voor de volgende klant.",
        ],
      },
      {
        titel: "Twee klanten tegelijk",
        intro:
          "In de huidige situatie is het inpakken bij de zelfscankassa tijdrovend — zeker bij een steekproefcontrole — waardoor de volgende klant onnodig lang moet wachten.",
        punten: [
          "Met de product stoppoort verkort het CPS-systeem deze wachttijd aanzienlijk: de nieuwe klant begint al met scannen terwijl de vorige klant nog aan het inpakken is.",
          "De product stoppoort blijft gesloten totdat de camera heeft vastgesteld dat de vorige klant klaar is met inpakken.",
          "Zo wordt voorkomen dat de boodschappen van de nieuwe klant tussen die van de vorige klant terechtkomen — en wordt iedere zelfscankassa effectief door twee klanten tegelijk gebruikt.",
        ],
      },
    ],
    statiegeldTitel: "Ook een innamepunt voor statiegeldverpakkingen",
    statiegeldTekst:
      "Het tekort aan inleverpunten voor statiegeldverpakkingen kan, zo nodig, voor een belangrijk deel met het CPS-zelfscankassasysteem worden opgelost. Iedere met dual-technology beveiligde zelfscankassa kan daarmee ook dienen als innamepunt voor statiegeldproducten.",
    statiegeldPunten: [
      "Bij het scannen van de boodschappen stelt het systeem via de voorraadbeheerdatabase vast of het om een statiegeldverpakking gaat. De RFID-tag wordt dan niet gedeactiveerd; in plaats daarvan activeert het CPS de code van een aan/uit-schakelaar die alleen op RFID-tags van statiegeldverpakkingen zit.",
      "Via de knop ‘statiegeld inleveren’ start de klant later het inneemproces. Omdat de RFID-tags nog actief zijn en de aan/uit-schakelaar aanstaat, kan dezelfde scanprocedure worden gevolgd — nu met specifieke RFID- en QR-verpakkingslijsten in plaats van boodschappenlijsten.",
      "Een extra poortje voert de lege verpakkingen via een eigen loopband af naar een geschikte plaats, gescheiden van de boodschappen.",
      "Wordt tijdens het boodschappen scannen per ongeluk een retour-statiegeldverpakking aangeboden, dan herkent het CPS dit aan de aan/uit-schakelaar en corrigeert het automatisch — zo wordt voorkomen dat een lege verpakking als aankoop wordt verrekend.",
    ],
    ctaTitel: "Benieuwd hoe deze technologie aansluit op de retailmarkt?",
  },

  markt: {
    introTitel: "Point of Sale-innovaties die ertoe doen",
    introTekst:
      "Vijftig jaar POS-innovatie maakte van de lokale buurtwinkel een internationale retailketen. Iedere sprong — barcode, zelfscan, QR-code, RFID — veranderde het afrekenen ingrijpend. De volgende stap: het afrekenen ook betrouwbaar maken.",
    tijdlijn: [
      {
        periode: "±50 jaar geleden",
        titel: "De barcode verandert de kassa",
        tekst:
          "Op initiatief van Albert Heijn begon de retail in Nederland met het plaatsen van een barcode op verpakkingen. De kassière hoefde de prijs niet langer handmatig in te tikken: een simpele piep van de barcodescanner nam die taak over. Lange wachtrijen en invoerfouten behoorden tot het verleden — goed voor het verdienmodel van de retailer, en ook de klant werd er heel vrolijk van.",
      },
      {
        periode: "±40 jaar geleden",
        titel: "De eerste zelfscankassa",
        tekst:
          "Albert Heijn introduceerde de allereerste zelfscankassa. Pas zo'n dertig jaar later brak het concept — mede door de coronapandemie — goed door. Al snel bleek echter dat de beoogde besparingen, vooral voor de FMCG-retailer, niet werden gehaald, terwijl de introductie een schrikbarende toename in winkeldiefstal veroorzaakte.",
      },
      {
        periode: "1994",
        titel: "De QR-code wordt ontwikkeld",
        tekst:
          "De QR-code bracht een veel snellere informatieoverdracht en een grotere opslagcapaciteit dan de barcode. Voor de FMCG-retailer opende dit de weg naar een nog efficiëntere en veel klantvriendelijkere bedrijfsvoering — denk aan logistiek en marketing.",
      },
      {
        periode: "Sunrise 2027",
        titel: "Wereldwijde overstap op de GS1 Digital Link QR-code",
        tekst:
          "Via het Sunrise 2027-initiatief wordt de barcode wereldwijd vervangen door de nieuwe GS1 Digital Link QR-code. Overheden en wetgevers spelen hierin een cruciale rol: denk aan het EU Digital Product Passport voor regelgeving en duurzaamheid, en de Amerikaanse FSMA 204 voor voedselveiligheid en traceerbaarheid.",
      },
      {
        periode: "Heden",
        titel: "RFID en dual-technology",
        tekst:
          "De huidige RFID-ontwikkelingen creëren aantrekkelijke nieuwe mogelijkheden voor een verdere efficiëntieslag in de POS-bedrijfsvoering: een specifiek ontwikkelde RFID-tag op de verpakking, naast de reeds aanwezige GS1 Digital Link QR-code. Met een positieve impact op de Return on Investment leidt dit tot betere operationele efficiëntie en optimalisatie van het voorraadbeheer. GS1 denkt intussen na over het harmoniseren van de standaardisatieprotocollen voor dual-technology.",
      },
      {
        periode: "2026",
        titel: "De 2FA-antidiefstalmethode van POS-2FA-Intermediary",
        tekst:
          "Alle POS-innovaties samen zorgden voor de transitie van de kleinschalige buurtwinkel naar de internationale retailketen — maar de zelfscankassa bracht ook grootschalige winkeldiefstal met zich mee. POS-2FA-Intermediary ontwikkelde daarom een antidiefstalmethode die het probleem bij de bron aanpakt, gebruikmakend van dual-technology.",
      },
    ],
    nederlandTitel: "Aansluiting op Nederlandse retailontwikkelingen",
    nederlandTekst:
      "Met de invoering van de zelfscankassa verviel de mogelijkheid om aan de kassa statiegeldproducten in te leveren. Door het verdwijnen van de kassière en steeds strengere wetgeving voor de recycling van verpakkingsmaterialen is een schrijnend tekort aan inleverpunten ontstaan.",
    inleverpuntTitel: "De CPS-kassa als inleverpunt",
    inleverpuntTekst:
      "Dit tekort kan, zo nodig, voor een belangrijk deel worden opgelost door het aanpassen van de CPS-programmatuur: iedere met dual-technology beveiligde zelfscankassa kan daarmee ook geschikt worden gemaakt als innamepunt voor statiegeldproducten.",
    wereldwijdTitel: "Aansluiting op wereldwijde retailontwikkelingen",
    wereldwijdTekst:
      "Gezien de huidige stand van de techniek — en mede dankzij de ervaring die wordt opgedaan met de wereldwijde invoering van de GS1 Digital Link QR-code — lijkt het voor de meeste producten van FMCG-retailers mogelijk om vanaf 2028 de met dual-technology beveiligde zelfscankassa economisch haalbaar in te voeren.",
    kaarten: [
      {
        titel: "Fast fashion: snel te realiseren",
        tekst:
          "In de fast-fashionkledingindustrie kan het 2FA-antidiefstalsysteem relatief snel worden doorgevoerd, omdat RFID-technologie daar — bij de antidiefstalpoorten — al op grote schaal wordt toegepast.",
      },
      {
        titel: "Voedingsmiddelen: het source-tagprobleem",
        tekst:
          "In de voedingsmiddelenbranche ligt de invoering ingewikkelder door het zogeheten source-tagprobleem: RFID-tags op natte verpakkingen zijn — net als QR-codes op verpakkingen die door het product of condens nat zijn geworden — nog niet altijd goed scanbaar.",
      },
      {
        titel: "Geen belemmering voor de bulk",
        tekst:
          "Voor de bulk van de producten hoeft dit de invoering niet te belemmeren: waar RFID-tags van natte verpakkingen nog niet goed scanbaar zijn, blijft de klant deze — zoals nu al gebeurt — handmatig invoeren via het touchscreen. De volledige implementatie volgt zodra het source-tagprobleem, onder meer door de doorontwikkeling van de anti-liquid RFID-tag, effectief is opgelost.",
      },
    ],
    ctaTitel: "De timing is er. De technologie is er. Het patent is er.",
  },

  patent: {
    introTitel: "Het patent is geen eindpunt, maar juist het begin",
    introTekst:
      "De methode is niet ontwikkeld vanuit een commerciële ambitie, maar vanuit verwondering over het gemak waarmee, tijdens het gebruik van zelfscankassa’s, boodschappen niet worden afgerekend.",
    patentLabel: "Gepubliceerd patent",
    patentTekst:
      "Het patent beschrijft het Cyber-Physical System (CPS) waarmee winkeldiefstal bij de zelfscankassa proactief wordt voorkomen via tweevoudige artikelauthenticatie (2FA) — en waarmee de zelfscankassa door twee klanten tegelijkertijd gebruikt kan worden en statiegeldverpakkingen ingenomen en verrekend kunnen worden.",
    kenmerken: [
      "2FA-artikelauthenticatie",
      "Twee klanten tegelijk",
      "Statiegeldinname",
    ],
    partnerTitel: "Geen kassaleverancier, wel dé sleuteltechnologie",
    partnerTekst:
      "POS-2FA-Intermediary heeft geen ambitie om zelf leverancier van kassasystemen te worden. Ons doel is een strategische koper of licentiepartner te vinden die de technologie wereldwijd kan implementeren.",
    wereldwijdNoot:
      "Wereldwijd implementeerbaar — aansluitend op Sunrise 2027 en de opkomst van dual-technology in de retail.",
    ctaTitel: "Bent u de strategische partner die wij zoeken?",
    ctaTekst:
      "Bent u geïnteresseerd in het patent, een licentie of een strategische overname? Neem dan contact met ons op.",
  },

  contact: {
    titel: "Laten we kennismaken",
    tekst:
      "Bent u geïnteresseerd in het patent, een licentie of een strategische samenwerking? We horen graag van u.",
    mailTitel: "Stuur ons een e-mail",
    mailTekst:
      "Vragen over de technologie, het patent of de mogelijkheden voor samenwerking? Mail ons — we reageren graag.",
    patentKaartTitel: "Over het patent",
    patentKaartTekst:
      "“Method and System for self-checkout at a point of sale” — de basis voor iedere samenwerking.",
    partnersTitel: "Voor strategische partners",
    partnersTekst:
      "Wij zoeken een strategische koper of licentiepartner die de technologie wereldwijd kan implementeren.",
  },
};

export type Inhoud = typeof standaardInhoud;
