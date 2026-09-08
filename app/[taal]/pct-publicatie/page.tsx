import { notFound, redirect } from "next/navigation";
import { isTaal, pad } from "@/lib/i18n";

/**
 * De PCT-publicatiegegevens staan tegenwoordig op de octrooipagina; deze
 * route blijft bestaan zodat eerder gedeelde links niet doodlopen.
 */
export default async function PctPublicatiePage({
  params,
}: PageProps<"/[taal]/pct-publicatie">) {
  const { taal } = await params;
  if (!isTaal(taal)) notFound();
  redirect(pad(taal, "/octrooi"));
}
