import { notFound, redirect } from "next/navigation";
import { isTaal, pad } from "@/lib/i18n";

/** De stappenplannen staan per situatie op een eigen pagina. */
export default async function StappenplannenPage({
  params,
}: PageProps<"/[taal]/stappenplannen">) {
  const { taal } = await params;
  if (!isTaal(taal)) notFound();
  redirect(pad(taal, "/stappenplannen/situatie-1"));
}
