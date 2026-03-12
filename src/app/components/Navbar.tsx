"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ dict }: { dict: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLocale, setCurrentLocale] = useState("en");

    const pathname = usePathname();

    useEffect(() => {
        const localeFromPath = pathname?.split("/")[1] || "en";
        setCurrentLocale(localeFromPath);
    }, [pathname]);

    const isRTL = currentLocale === "fa";

    return (
        <nav className="backdrop-blur-md bg-white/70 shadow-lg sticky top-0 z-50 border-b border-gray-200">
            <div
                dir={isRTL ? "rtl" : "ltr"}
                className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"
                    }`}
            >
                <div
                    className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${isRTL ? "ml-4" : "mr-4"
                        }`}
                >
                    {dict?.schoolName || "School"}
                </div>

                <div
                    className={`hidden md:flex items-center gap-8 font-medium text-gray-800 ${isRTL ? "flex-row-reverse text-right" : "flex-row text-left"
                        }`}
                >
                    <Link href={`/${currentLocale}`}>{dict?.navbar?.home}</Link>
                    <Link href={`/${currentLocale}/about`}>{dict?.navbar?.about}</Link>
                    <Link href={`/${currentLocale}/contact`}>{dict?.navbar?.contact}</Link>
                    <Link
                        href={`/${currentLocale}/admission`}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow-md"
                    >
                        {currentLocale === "fa" ? "ثبت نام" : "Admission"}
                    </Link>
                    <LanguageSwitcher />
                </div>

                <button className="md:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isOpen && (
                <div
                    className={`md:hidden bg-white/95 backdrop-blur-md px-6 py-4 space-y-4 shadow-inner animate-slideDown ${isRTL ? "text-right" : "text-left"
                        }`}
                >
                    <Link href={`/${currentLocale}`} onClick={() => setIsOpen(false)}>
                        {dict?.navbar?.home}
                    </Link>
                    <Link href={`/${currentLocale}/about`} onClick={() => setIsOpen(false)}>
                        {dict?.navbar?.about}
                    </Link>
                    <Link href={`/${currentLocale}/contact`} onClick={() => setIsOpen(false)}>
                        {dict?.navbar?.contact}
                    </Link>
                    <Link
                        href={`/${currentLocale}/admission`}
                        className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        {currentLocale === "fa" ? "ثبت نام" : "Admission"}
                    </Link>
                    <LanguageSwitcher />
                </div>
            )}
        </nav>
    );
}