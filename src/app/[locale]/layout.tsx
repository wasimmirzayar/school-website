import Navbar from "../components/Navbar";
import { getDictionary, Locale } from "../dictionaries";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string } | Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const typedLocale = locale as Locale; // ⚡ TypeScript-safe
    const dict = getDictionary(typedLocale);
    const isRTL = typedLocale === "fa";

    return (
        <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-vazir" : "font-sans"}>
            <Navbar dict={dict} locale={typedLocale} />
            {children}
        </div>
    );
}