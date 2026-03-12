// src/dictionaries.ts
import fa from "./fa";
import en from "./en";

export const dictionaries = { fa, en };

export type Locale = "fa" | "en";

export function getDictionary(locale: string) {
    const typedLocale = locale as Locale;
    return dictionaries[typedLocale] || dictionaries.en;
}