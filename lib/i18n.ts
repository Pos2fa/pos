export const TALEN = ["nl", "en"] as const;
export type Taal = (typeof TALEN)[number];

export function isTaal(waarde: string): waarde is Taal {
  return (TALEN as readonly string[]).includes(waarde);
}

/** Bouwt een intern pad voor de gegeven taal: NL zonder prefix, EN met /en. */
export function pad(taal: Taal, route: string): string {
  if (taal === "en") {
    return route === "/" ? "/en" : `/en${route}`;
  }
  return route;
}
