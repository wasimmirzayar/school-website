import Navbar from "../components/Navbar";
import { getDictionary, Locale } from "../dictionaries";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: Locale } | Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

    const dict = getDictionary(locale);
    const isRTL = locale === "fa";

    return (
        <div
            dir={isRTL ? "rtl" : "ltr"}
            className={locale === "fa" ? "font-vazir" : "font-sans"}
        >
            {/* Pass locale as a prop */}
            <Navbar dict={dict} />
            {children}
        </div>
    );
}