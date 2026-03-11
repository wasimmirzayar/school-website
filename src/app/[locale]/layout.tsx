import Navbar from "../components/Navbar";
import { getDictionary, Locale } from "../dictionaries";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const isRTL = locale === "fa";

    return (
        <div
            dir={isRTL ? "rtl" : "ltr"}
            className={locale === "fa" ? "font-vazir" : "font-sans"}
        >
            <Navbar locale={locale} dict={dict} />
            {children}
        </div>
    );
}