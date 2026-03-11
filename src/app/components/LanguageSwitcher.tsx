"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const newLocale = pathname.startsWith("/fa") ? "en" : "fa";

        // مسیر جدید: segment اول را با زبان جدید جایگزین می‌کنیم
        const newPath = pathname.replace(/^\/(fa|en)/, "");
        router.push(`/${newLocale}${newPath}`);
    };

    const buttonLabel = pathname.startsWith("/fa") ? "فارسی" : "English";

    return (
        <button
            onClick={toggleLocale}
            className="border px-3 py-1 rounded text-sm"
        >
            {buttonLabel}
        </button>
    );
}