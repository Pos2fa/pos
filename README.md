# POS-2FA-Intermediary — website

Professionele bedrijfswebsite voor [pos-2fa-intermediary.com](https://pos-2fa-intermediary.com): de gepatenteerde 2FA-antidiefstalmethode voor zelfscankassa's (dual-technology: QR-codes + RFID-tags, aangestuurd door een Cyber-Physical System).

Gebouwd met **Next.js (App Router) + TypeScript + Tailwind CSS**.

## Pagina's

| Route          | Inhoud                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| `/`            | Hero, probleem in cijfers, de oplossing in 3 stappen, voordelen, CTA   |
| `/technologie` | Het CPS-systeem, de 4 situaties met de patenttekening, statiegeld      |
| `/markt`       | Tijdlijn van POS-innovaties, Nederlandse & wereldwijde ontwikkelingen  |
| `/patent`      | Het patent "Method and System for self-checkout at a point of sale"    |
| `/contact`     | Contactgegevens (info@pos-2fa-intermediary.com)                        |
| `/beheer`      | Beheeromgeving: inloggen en alle teksten van de site aanpassen         |

## Beheeromgeving (teksten aanpassen)

De eigenaar kan via **`/beheer`** inloggen en alle teksten van de website aanpassen; wijzigingen staan na opslaan direct live.

1. **Wachtwoord instellen** — zet de omgevingsvariabele `ADMIN_PASSWORD` (lokaal in `.env.local`, op Vercel via *Project → Settings → Environment Variables*). Kies een lang, uniek wachtwoord.
2. **Opslag op Vercel** — koppel eenmalig de gratis integratie **Upstash for Redis** (Vercel-dashboard → *Storage* → *Create Database* → Upstash Redis) aan het project en deploy opnieuw. Lokaal is niets nodig: daar worden wijzigingen in `data/content.json` bewaard.
3. De knop *"Herstel originele teksten"* zet alles terug naar de teksten uit het brondocument.

## Lokaal draaien

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployen op Vercel

1. Push deze map naar een Git-repository (GitHub/GitLab/Bitbucket).
2. Importeer de repository op [vercel.com/new](https://vercel.com/new) — Vercel herkent Next.js automatisch; er is geen extra configuratie nodig.
3. Koppel daarna het domein `pos-2fa-intermediary.com` via **Project → Settings → Domains**.
