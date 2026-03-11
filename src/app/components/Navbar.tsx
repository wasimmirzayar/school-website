"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({
    locale,
    dict,
}: {
    locale: string;
    dict: any;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const isRTL = locale === "fa";

    return (
        <nav className="backdrop-blur-md bg-white/70 shadow-lg sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {dict.schoolName}
                </div>

                {/* Desktop Menu */}
                <div
                    className={`hidden md:flex items-center gap-8 font-medium text-gray-800 
                        }`}
                >
                    <Link href={`/${locale}`} className="hover:text-blue-600 transition">
                        {dict.navbar.home}
                    </Link>

                    <Link href={`/${locale}/about`} className="hover:text-blue-600 transition">
                        {dict.navbar.about}
                    </Link>

                    <Link href={`/${locale}/contact`} className="hover:text-blue-600 transition">
                        {dict.navbar.contact}
                    </Link>

                    <Link
                        href={`/${locale}/admission`}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition transform duration-200"
                    >
                        {locale === "fa" ? "ثبت نام" : "Admission"}
                    </Link>

                    <LanguageSwitcher />
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden text-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md px-6 py-4 space-y-4 shadow-inner animate-slideDown">
                    <Link href={`/${locale}`} onClick={() => setIsOpen(false)}>
                        {dict.navbar.home}
                    </Link>

                    <Link href={`/${locale}/about`} onClick={() => setIsOpen(false)}>
                        {dict.navbar.about}
                    </Link>

                    <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
                        {dict.navbar.contact}
                    </Link>

                    <Link
                        href={`/${locale}/admission`}
                        className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        {locale === "fa" ? "ثبت نام" : "Admission"}
                    </Link>

                    <LanguageSwitcher />
                </div>
            )}
        </nav>
    );
}