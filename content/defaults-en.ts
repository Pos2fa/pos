import type { Inhoud } from "./defaults";

/**
 * Engelse vertaling van alle websiteteksten. Zelfde structuur als de
 * Nederlandse standaardteksten; wijzigingen via /en/beheer worden er
 * overheen gelegd.
 */
export const standaardInhoudEN: Inhoud = {
  algemeen: {
    footerTagline:
      "Proactive theft prevention for self-checkouts through two-factor article authentication (2FA) with dual technology.",
    contactEmail: "info@pos-2fa-intermediary.com",
    patentTitel: "Method and System for self-checkout at a point of sale",
    octrooiNummer: "NL4000008",
  },

  home: {
    heroBadge: "Patented dual technology · 2FA",
    heroTitel: "Proactive security puts an end to shoplifting at self-checkouts",
    heroTekst:
      "Spot checks, exit gates, cameras and AI systems can detect fraud, but they do not prevent it. POS-2FA-Intermediary developed an anti-theft method that tackles the problem at its source: two-factor article authentication using QR codes and RFID tags.",
    statistieken: [
      {
        waarde: "€ 1 billion",
        tekst:
          "estimated annual loss for Dutch retail caused by theft at self-checkouts",
      },
      {
        waarde: "1% → 2%",
        tekst:
          "doubling of shrinkage in the supermarket sector since the large-scale introduction of self-scanning",
      },
      {
        waarde: "40,000",
        tekst:
          "shoplifting cases still registered by the police in 2025 — out of hundreds of thousands, according to research by the Dutch Ministry of Justice and Security",
      },
    ],
    probleemTitel: "Reactive measures detect, but do not prevent",
    probleemTekst:
      "Rising shrinkage forced retailers into far-reaching anti-theft measures. These turn out to be ineffective, privacy-sensitive and rather customer-unfriendly. Shoplifting at self-checkouts can only be solved effectively by making the payment process reliable during scanning itself.",
    probleemKaarten: [
      {
        titel: "Spot checks & exit gates",
        tekst:
          "Only check after the fact, regularly frustrate well-meaning customers and do not stop theft.",
      },
      {
        titel: "Cameras & AI systems",
        tekst:
          "Can detect fraud, but do not prevent it — and raise privacy questions on top of that.",
      },
      {
        titel: "Staff acting as police officers",
        tekst:
          "For store staff, having to play police officer is highly confrontational.",
      },
      {
        titel: "A retreating police force",
        tekst:
          "The police are withdrawing ever further from the civil handling of shoplifting — the enforcement problem keeps growing.",
      },
    ],
    oplossingTitel:
      "From reactive to proactive prevention: preventing instead of checking afterwards",
    oplossingTekst:
      "A purpose-built Cyber-Physical System (CPS) compares the QR codes on the packaging with the additionally applied RFID tags during checkout: two-factor article authentication (2FA) in three steps.",
    stappen: [
      {
        titel: "Remote RFID scan",
        tekst:
          "As soon as the customer checks in at the self-checkout, all groceries in the basket or shopping trolley are scanned automatically in one go by the built-in RFID reader. The CPS program turns this into the RFID shopping list: the reference list.",
      },
      {
        titel: "Customer scans the QR codes",
        tekst:
          "The customer scans the groceries one by one, as usual, and places them on a conveyor belt that carries them to the packing area. The CPS program simultaneously builds the QR shopping list.",
      },
      {
        titel: "2FA validation by the CPS",
        tekst:
          "The CPS program compares both lists simultaneously. If a product is missing or something was not scanned correctly, the customer receives instructions on the screen. Only after correction can the payment be completed.",
      },
    ],
    kassiereNoot:
      "In essence, the CPS does what the cashier used to do: check the trolley for anything not yet paid for and move the groceries to the packing area. This can halve the throughput time per self-checkout.",
    voordelenTitel: "A win-win for retailer and consumer alike",
    voordelen: [
      {
        titel: "Preventing theft at the source",
        tekst:
          "Robust, continuous and automated control by the CPS — instead of a costly and hard-to-enforce network of repressive measures.",
      },
      {
        titel: "Customer-friendly and privacy-aware",
        tekst:
          "Ad-hoc spot checks and other unreliable, customer-unfriendly and privacy-sensitive security methods become a thing of the past.",
      },
      {
        titel: "Faster flow",
        tekst:
          "The conveyor belt and the product stop gate allow two customers to use the same checkout at once: throughput time per self-checkout is halved.",
      },
      {
        titel: "Deposit-return intake at the checkout",
        tekst:
          "With an adjustment of the CPS software, every secured self-checkout also serves as a return point for deposit packaging.",
      },
      {
        titel: "Good for the business model",
        tekst:
          "The exorbitant shrinkage at the self-checkout is prevented proactively — and the intended savings of self-scanning are finally realised.",
      },
      {
        titel: "Relieving the enforcement burden",
        tekst:
          "A proactive approach is also a fitting answer to the ever more pressing enforcement problem around shoplifting.",
      },
    ],
    ctaTitel: "The patent as the basis for partnership",
    ctaTekst:
      "POS-2FA-Intermediary is looking for a strategic buyer or licensing partner able to implement the patented technology worldwide.",
  },

  technologie: {
    introTitel: "The proactive self-checkout secured with dual technology",
    introTekst1:
      "With the developments in RFID technology as of 2026, it is now perfectly possible to proactively prevent the exorbitant theft-driven shrinkage at the self-checkout while the groceries are being paid for. This also removes the need for a costly and hard-to-enforce judicial network of repressive measures.",
    introTekst2:
      "The core: a purpose-built Cyber-Physical System (CPS) compares the QR codes on the packaging with the additionally applied RFID tags during checkout — two-factor article authentication (2FA).",
    stappenTitel: "How the CPS reduces shrinkage in three steps",
    stappen: [
      {
        titel: "Remote RFID scan",
        tekst:
          "As soon as the customer checks in at the self-checkout, all groceries in the basket or trolley are scanned automatically in one go by an RFID reader built into the checkout system. The CPS program turns this into an RFID shopping list stored in the checkout system: the reference list against which the groceries scanned by the customer are verified.",
      },
      {
        titel: "Customer scans the QR codes",
        tekst:
          "The customer scans the groceries one by one at the self-checkout, as usual, and places them on a conveyor belt that carries them to the packing area. Based on these manual scans, the CPS program simultaneously builds a QR shopping list that is also stored in the checkout system.",
      },
      {
        titel: "2FA validation by the CPS program",
        tekst:
          "The CPS program compares both shopping lists simultaneously. If a product is missing, or something was not scanned correctly, the customer receives on-screen instructions on how to correct this. Only after correction can the payment be completed, the groceries be packed and the store be left.",
      },
    ],
    verschilTitel: "The fundamental difference with today's self-checkout",
    verschilTekst:
      "In essence, the 2FA validation mirrors what the cashier used to do. Only now it is the CPS — instead of the cashier — that checks the trolley for groceries still to be paid for, and the CPS that moves the groceries to the packing area on the other side of the checkout. This can halve the throughput time per self-checkout.",
    huidigeKassaPunten: [
      "After scanning the QR code — or not — groceries are placed back in the trolley or packed straight into the shopping bag.",
      "The store is then left, legally or not, by showing a receipt — or not.",
      "Checks happen afterwards and at random — frustrating for the well-meaning customer, and a favourite topic of complaint.",
    ],
    cpsKassaPunten: [
      "Every scanned product goes straight onto the conveyor belt to the packing area — nothing disappears unchecked into a bag or trolley.",
      "The continuous, automated 2FA check replaces ad-hoc spot checks and all other unreliable, customer-unfriendly and privacy-sensitive methods.",
      "A robust solution that prevents shoplifting at the self-checkout — good for the retailer's business model and the consumer's peace of mind.",
    ],
    systeemTitel: "The theft-proof CPS self-checkout system in pictures",
    systeemTekst:
      "The Cyber-Physical System described in the patent “Method and System for self-checkout at a point of sale” controls the security gate, the privacy gate and the product stop gate, and combines camera, RFID reader and QR scanner. Four situations describe the complete operation — from checking in to leaving the store.",
    situatieBijschriften: [
      "A free checkout is recognisable by the open privacy gate. The customer can drive the trolley in right up to the closed security gate. Pressing the start button starts up the system, closing the privacy gate and the product stop gate.",
      "Once scanning is done and payment completed, the system checks whether the previous customer has left the exit. Only then is the security gate opened. After the trolley has passed, the security gate closes and the product stop gate and privacy gate open.",
      "The customer packs her groceries. The camera signals when she is done and has left the exit together with the trolley. The transaction is then closed and the system is ready for a new customer.",
      "Until the camera has established that the previous customer has left the exit, the product stop gate remains closed. This prevents the new customer's groceries from ending up in the wrong bag.",
    ],
    situaties: [
      {
        titel: "Checking in at the checkout",
        intro:
          "A free checkout is recognisable by the open privacy gate. The customer drives the trolley in, right up to the closed security gate.",
        punten: [
          "The security gate can only be opened in two ways: by a store employee, or by the CPS system — after payment, or when a customer wants to leave the store without purchases.",
          "Anyone wanting to leave without purchases presses the ‘I want to leave the store’ button. The privacy gate and the product stop gate close; the camera checks the trolley or basket while the RFID reader checks for products carrying an RFID code.",
          "If the trolley contains products, the system asks whether the customer wants to pay or return the products. For returns, the system guides the customer step by step.",
          "If RFID codes are detected with an empty trolley, or products without any RFID code, security is alerted immediately: this may indicate intended fraud or deactivated tags.",
          "Customers who scanned with the app or hand scanner pay at a separate kiosk. There, the RFID scanner first verifies that all products have actually been scanned.",
          "Payment is only possible individually or as a group — the loophole of slipping out past waiting customers no longer exists.",
        ],
      },
      {
        titel: "Scanning and paying",
        intro:
          "Closing the privacy gate protects the customer's privacy and prevents an open connection with the store whenever the security gate opens.",
        punten: [
          "After pressing the ‘I want to pay’ button, the camera checks the trolley and the RFID reader reads all RFID codes in one go: the RFID shopping list.",
          "The customer then scans the products one by one. At every scan, the CPS system checks whether the product appears on the RFID shopping list and whether the QR code matches the unique code in the store's inventory database.",
          "A product the customer already owned when entering the store is recognised and removed from the RFID shopping list. If a scanned product is not on the list, security is alerted — for instance in case of a damaged RFID code.",
          "After each successful check, the RFID tag decoder is activated; only then may the next product be scanned. The customer places the scanned product on the belt.",
          "If a product is placed on the conveyor belt without scanning its QR code, the belt stops immediately and the customer sees an error message on the checkout screen asking them to scan the product again.",
          "If, after pressing the ‘end of scan’ button, the RFID shopping list shows unpaid products, the CPS system prompts the customer to correct this. If necessary, security is called in.",
          "The security gate opens once all groceries have been scanned and paid for correctly. Only then can the groceries be packed and the store be left.",
          "Cancelling is only possible via the ‘return products’ button — for example when a customer decides not to buy certain products, or at a checkout with a maximum number of items.",
        ],
      },
      {
        titel: "Packing the groceries",
        intro:
          "As soon as payment is completed, the security gate opens to let the customer through with the empty trolley — and closes again immediately, monitored by the camera.",
        punten: [
          "At the same time, the product stop gate and the privacy gate open. The paid groceries are carried by the conveyor belt to the packing area behind the product stop gate.",
          "There the customer can pack the groceries at ease, outside the checkout zone.",
          "The camera signals when the customer has left the exit together with the trolley. The CPS system closes the transaction and is ready for the next customer.",
        ],
      },
      {
        titel: "2 shopping trolleys",
        intro:
          "In today's situation, packing at the self-checkout is time-consuming — especially during a spot check — forcing the next customer to wait unnecessarily long.",
        punten: [
          "With the product stop gate, the CPS system shortens this waiting time considerably: the new customer starts scanning while the previous customer is still packing.",
          "The product stop gate remains closed until the camera has established that the previous customer has finished packing.",
          "This prevents the new customer's groceries from getting mixed up with those of the previous customer — and effectively lets two customers use every self-checkout at once.",
        ],
      },
    ],
    ctaTitel: "Curious how this technology connects to the retail market?",
    stappenplannen: [
      {
        titel: "Step-by-step guide situation 1 — Checking in at the checkout",
        alineas: [
          "The ‘security gate’ beyond the entrance of the self-checkout can only be opened in two ways: by the store employee, or for a reason requiring action by the CPS system. Such as wanting to leave the store without purchases, or after scanning ‘all’ groceries with an app using the hand scanner or mobile phone, or scanning and paying for ‘all’ groceries at the self-checkout.",
          "If the customer wants to leave the store without buying anything, this is only possible by starting up the CPS system. This prevents the customer from leaving the store unpaid through all kinds of loopholes. The customer presses the ‘I want to leave the store’ button. This starts the CPS system and closes the ‘privacy gate’ and the ‘product stop gate’. The camera checks whether the customer has a trolley or basket and whether it contains products. The RFID reader additionally checks whether products with an RFID code are detected.",
          "If the trolley contains products and RFID codes are detected, the customer is asked whether they want to pay for the groceries. If yes, the process continues with point 3 of situation 2. If no, the customer is asked to press the ‘return products’ button, after which the CPS system asks the customer to scan the items concerned and, following the on-screen instructions, place them in the returns bin. The CPS system updates the RFID shopping list and calls a store employee for assistance. Only when no return RFID tags can be read any more does the CPS system open the ‘security gate’ to let the customer through, closing it again immediately. The store employee can put the products back on the shelf. The transaction is closed.",
          "If the trolley is empty but RFID codes are detected, security is called in immediately. They check whether unpaid groceries are in the customer's bag, asking whether the customer intends to pay for them. If yes, the process continues with point 3 of situation 2. If no, intended fraud may be at play. This can be confirmed by comparing the QR code on the packaging of the products concerned, via the QR reader, with the product code in the inventory database. Security then takes an appropriate anti-theft measure.",
          "If it is established that there are products in the trolley but no RFID code is detected at all, the CPS system calls in security immediately. This may involve fraudulent deactivation of the RFID codes. Security follows up with an appropriate anti-theft measure.",
          "If the customer has no trolley or basket and no RFID codes are detected, the CPS system opens the ‘security gate’ to let the customer through, closing it again immediately. The ‘leave the store’ transaction is then closed and the ‘privacy gate’ and ‘product stop gate’ reopen.",
          "The customer who wants to pay for groceries collected with the app, via the hand scanner or mobile phone, does so at a separate kiosk. The CPS protocol is then followed as usual, with the difference that when the ‘I want to pay’ button is pressed, the RFID scanner first checks whether RFID tags are present. If not, payment can proceed; if so, the CPS system indicates which products still need to be scanned, then continues with point 3 of situation 2. If necessary, a store employee is alerted to assist.",
          "These days it regularly happens that a group of schoolkids, each with their own bag of crisps or chocolate bar in hand, causes a huge jam at the self-checkout because each wants to pay separately. This also causes problems at the staffed checkout: leaving the store unpaid, slipping past the waiting customers. That loophole no longer exists in the CPS system, because payment is only possible individually or as a group. This means that whoever realises this too late must continue with point 2 of situation 1: ending the transaction.",
        ],
      },
      {
        titel: "Step-by-step guide situation 2 — Scanning and paying",
        alineas: [
          "Closing the ‘privacy gate’ after starting the CPS system serves two purposes. First, it protects the privacy of the customer going through the payment procedure, preventing an impatient customer from bumping a trolley into someone's legs. It also prevents an open connection with the store every time the ‘security gate’ is opened.",
          "Payment at the self-checkout starts with a press on the ‘I want to pay’ button. The camera checks whether there are products in the trolley, while the RFID reader reads the RFID codes on the products and builds an RFID shopping list from them.",
          "Following the CPS system's instructions, the customer starts scanning the products. At each scan, the system checks whether the product appears in the RFID shopping list. The CPS system also checks whether the QR code of the scanned product matches the unique code in the supermarket's inventory database.",
          "If the latter is not the case, the CPS system asks the customer to put this product back in the trolley and keep it separate from the other products. It may then be assumed that this is a product the customer already owned when entering the store. At the same time, the CPS system removes this product from the RFID shopping list.",
          "If, when scanning a product, the CPS system establishes that the product does not appear on the RFID shopping list, security is alerted immediately. They check whether the RFID code on the packaging of the product concerned may be damaged. Security can correct for this.",
          "Once the CPS system has established that the QR code of the scanned product appears in the inventory database, the data is stored in the QR shopping list and the RFID tag decoder is activated automatically; it is unnecessary, and too time-consuming, to have the customer confirm this QR code check. When the RFID tag decoder has done its work, the CPS system indicates that the next product may be scanned. The customer places the scanned product on the belt and picks up the next one, and so on. When the last product has been scanned, the customer indicates this by pressing the ‘end of scan’ button. Payment can then be made with the payment method of choice.",
          "If the customer places a product on the conveyor belt without scanning its QR code, the CPS system detects a passing product whose RFID tag has not been deactivated. The belt is stopped immediately and an error message appears on the checkout screen asking the customer to scan the product again. If this succeeds, checkout can be completed. If not, security follows up with an appropriate anti-theft measure.",
          "If, after the ‘end of scan’ button is pressed, the camera establishes that no products remain visible in the trolley or basket, but the RFID shopping list indicates products still to be paid for, security is called in. They check whether these products are perhaps in the customer's bag, asking whether the customer intends to pay for them after all. If yes, the process continues with point 3 of situation 2. If no, intended fraud may be at play. This can be confirmed by comparing the QR code on the packaging of the products concerned, via the QR reader, with the unique product code in the inventory database. Security then takes an appropriate anti-theft measure.",
          "If, after the ‘end of scan’ button is pressed, the camera establishes that products remain in the trolley or basket which do not appear in the RFID shopping list, these are products whose RFID codes were deliberately damaged and, given the earlier check, not scanned. Security follows up with an appropriate anti-theft measure.",
          "Once the scanning process has started, it can only be cancelled in one way. There are several reasons for this: a group of schoolkids may decide they don't want to send each other a payment request after all, a customer may decide on second thought not to buy certain products, or it may be a self-checkout where, say, a maximum of five products may be presented. The customer can then end the transaction by pressing the ‘return products’ button and continue as described in point 3 of situation 1.",
        ],
      },
      {
        titel: "Step-by-step guide situation 3 — Packing the groceries",
        alineas: [
          "When payment for the groceries is completed, the CPS system opens the ‘security gate’ to let the customer through with the empty trolley. After passing, the ‘security gate’ closes again immediately. This is monitored by a camera. At the same time, the ‘product stop gate’ and ‘privacy gate’ open and the paid products are carried by a conveyor belt to a spot behind the ‘product stop gate’, where the customer packs them.",
          "The camera signals when, after packing the groceries, the customer has left the exit together with the trolley. The CPS system then closes the transaction. The system is ready to handle the groceries of the next customer.",
        ],
      },
      {
        titel: "Step-by-step guide situation 4 — 2 shopping trolleys",
        alineas: [
          "Especially during an anti-theft spot check, packing groceries at today's self-checkout is rather time-consuming. As a result, the next customer is forced to wait unnecessarily long before the self-checkout in use becomes free again. The CPS system shortens this waiting time considerably by using a ‘product stop gate’.",
          "If the new customer starts scanning groceries while the previous customer is still packing, the ‘product stop gate’ remains closed. This prevents the new customer's groceries from ending up among those of the previous customer. The ‘product stop gate’ only opens once the camera has established that the previous customer has finished packing.",
        ],
      },
    ],
  },

  markt: {
    introTitel: "Point-of-sale innovations that matter",
    introTekst:
      "Fifty years of POS innovation turned the local corner shop into an international retail chain. Every leap — barcode, self-scanning, QR code, RFID — changed the checkout profoundly. The next step: making payment at the self-checkout reliable as well.",
    tijdlijn: [
      {
        periode: "±50 years ago",
        titel: "The barcode transforms the checkout",
        tekst:
          "On the initiative of Albert Heijn, Dutch retail started placing barcodes on packaging. The cashier no longer had to type in prices by hand: a simple beep of the barcode scanner took over. Long queues and input errors became a thing of the past — good for the retailer's business model, and customers loved it too.",
      },
      {
        periode: "±40 years ago",
        titel: "The first self-checkout",
        tekst:
          "Albert Heijn introduced the very first self-checkout. It took about thirty years — partly due to the corona pandemic — for the concept to truly break through. It soon became clear, however, that the intended savings, especially for the FMCG retailer, were not being achieved, while the introduction caused an alarming rise in shoplifting.",
      },
      {
        periode: "1994",
        titel: "The QR code is developed",
        tekst:
          "The QR code brought much faster information transfer and greater storage capacity than the barcode. For the FMCG retailer, this opened the way to an even more efficient and far more customer-friendly operation — think logistics and marketing.",
      },
      {
        periode: "Sunrise 2027",
        titel: "Worldwide switch to the GS1 Digital Link QR code",
        tekst:
          "Through the Sunrise 2027 initiative, the barcode is being replaced worldwide by the new GS1 Digital Link QR code. Governments and legislators play a crucial role: consider the EU Digital Product Passport for regulation and sustainability, and the American FSMA 204 for food safety and traceability.",
      },
      {
        periode: "Today",
        titel: "RFID and dual technology",
        tekst:
          "Current RFID developments create attractive new opportunities for a further efficiency leap in POS operations: a purpose-developed RFID tag on the packaging, alongside the already present GS1 Digital Link QR code. With a positive impact on the return on investment, this leads to better operational efficiency and optimised inventory management. GS1 is meanwhile considering how to harmonise the standardisation protocols for dual technology.",
      },
      {
        periode: "2026",
        titel: "The 2FA anti-theft method by POS-2FA-Intermediary",
        tekst:
          "Together, all POS innovations drove the transition from the small local shop to the international retail chain — but the self-checkout also brought large-scale shoplifting with it. POS-2FA-Intermediary therefore developed an anti-theft method that tackles the problem at its source, using dual technology.",
      },
    ],
    nederlandTitel: "Connecting to Dutch retail developments",
    nederlandTekst:
      "With the introduction of the self-checkout, the option of returning deposit products at the checkout disappeared. With the cashier gone and ever stricter legislation on recycling packaging materials, a dire shortage of return points has emerged.",
    inleverpuntTitel: "The CPS checkout as a return point",
    inleverpuntTekst:
      "This shortage can, where needed, largely be solved by adapting the CPS software: every self-checkout secured with dual technology can thereby also be made suitable as a return point for deposit products.",
    statiegeldTitel: "How the deposit-return intake works",
    statiegeldTekst:
      "The shortage of return points for deposit packaging can, where needed, largely be solved with the CPS self-checkout system. Every self-checkout secured with dual technology can then also serve as a return point for deposit products.",
    statiegeldPunten: [
      "When the groceries are scanned, the system establishes via the inventory database whether a product carries deposit packaging. The RFID tag is then not deactivated; instead, the CPS activates the code of an on/off switch that only sits on the RFID tags of deposit packaging.",
      "Later, when returning the deposit packaging, the customer can start the intake process via the ‘return deposit’ button. Because the RFID tags are still active and the on/off switch is on, the same scanning procedure can be followed — now with dedicated RFID and QR packaging lists instead of shopping lists.",
      "An extra gate carries the empty packaging away via its own conveyor belt to a suitable place, separated from the groceries.",
      "If a returnable deposit package is accidentally presented while scanning groceries, the CPS recognises this by the on/off switch on the packaging's RFID tag and corrects for it — preventing an empty package from being charged as a purchase.",
    ],
    wereldwijdTitel: "Connecting to worldwide retail developments",
    wereldwijdTekst:
      "Given the current state of technology — and thanks in part to the experience being gained with the worldwide introduction of the GS1 Digital Link QR code — it appears possible for most FMCG products to introduce the dual-technology-secured self-checkout economically from 2028 onwards.",
    kaarten: [
      {
        titel: "Fast fashion: quick to realise",
        tekst:
          "In the fast-fashion clothing industry, the 2FA anti-theft system can be introduced relatively quickly, because RFID technology is already applied there on a large scale — at the anti-theft gates.",
      },
      {
        titel: "Food: the source-tagging problem",
        tekst:
          "In the food sector, introduction is more complicated due to the so-called source-tagging problem: RFID tags on wet packaging — just like QR codes on packaging made wet by the product or condensation — cannot always be scanned reliably yet.",
      },
      {
        titel: "No obstacle for the bulk",
        tekst:
          "For the bulk of products this need not block introduction: where RFID tags on wet packaging cannot yet be scanned reliably, the customer simply keeps entering them manually via the touchscreen — as happens today. Full implementation follows once the source-tagging problem is effectively solved, among other things through further development of the anti-liquid RFID tag.",
      },
    ],
    ctaTitel: "The timing is there. The technology is there. The patent is there.",
  },

  patent: {
    introTitel: "The patent is not an end point, but the very beginning",
    introTekst:
      "The method was not developed out of commercial ambition, but out of astonishment at the ease with which groceries go unpaid at self-checkouts.",
    patentLabel: "Dutch patent NL4000008",
    patentTekst:
      "The patent describes the Cyber-Physical System (CPS) that proactively prevents shoplifting at the self-checkout through two-factor article authentication (2FA) — and that allows the self-checkout to be used by two customers at the same time, and deposit packaging to be taken in and settled.",
    kenmerken: [
      "2FA article authentication",
      "Two customers at once",
      "Deposit-return intake",
    ],
    partnerTitel: "Not a checkout supplier — the key technology",
    partnerTekst:
      "POS-2FA-Intermediary has no ambition to become a supplier of checkout systems itself. Our goal is to find a strategic buyer or licensing partner able to implement the technology worldwide.",
    wereldwijdNoot:
      "Implementable worldwide — aligned with Sunrise 2027 and the rise of dual technology in retail.",
    ctaTitel: "Are you the strategic partner we are looking for?",
    ctaTekst:
      "Interested in the patent, a licence or a strategic acquisition? Then do get in touch.",
  },

  octrooi: {
    introTitel: "Patent details",
    introTekst: "The details of the patent as registered at the patent office.",
    soort: "Dutch patent",
    status: "Patent granted on 4 September 2026",
  },

  contact: {
    titel: "Let's get acquainted",
    tekst:
      "Interested in the patent, a licence or a strategic partnership? We would love to hear from you.",
    mailTitel: "Send us an e-mail",
    mailTekst:
      "Questions about the technology, the patent or the possibilities for partnership? E-mail us — we will gladly respond.",
    patentKaartTitel: "About the patent",
    patentKaartTekst:
      "“Method and System for self-checkout at a point of sale” — the basis for every partnership.",
    partnersTitel: "For strategic partners",
    partnersTekst:
      "We are looking for a strategic buyer or licensing partner able to implement the technology worldwide.",
  },
};
