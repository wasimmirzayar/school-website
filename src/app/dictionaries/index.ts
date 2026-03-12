import fa from "./fa";
import en from "./en";

export const dictionaries = {
    fa,
    en,
};

export type Locale = "fa" | "en";

export function getDictionary(locale: Locale) {
    const dict = dictionaries[locale];
    if (!dict) {
        console.warn(`Dictionary for locale "${locale}" not found, defaulting to "en"`);
        return dictionaries.en;
    }
    return dict;
}