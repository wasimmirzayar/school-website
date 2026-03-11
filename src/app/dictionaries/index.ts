import fa from "./fa";
import en from "./en";

export const dictionaries = {
    fa,
    en,
};

export type Locale = "fa" | "en";

export function getDictionary(locale: Locale) {
    return dictionaries[locale];
}