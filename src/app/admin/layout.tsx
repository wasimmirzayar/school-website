"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("/login");
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 bg-blue-900 text-white p-5 flex flex-col">

                <div>
                    <h2 className="text-xl font-bold mb-6">School Admin</h2>

                    <ul className="space-y-3">
                        <Link href="/admin">
                            <li
                                className={`p-2 rounded cursor-pointer ${pathname === "/admin"
                                    ? "bg-blue-600"
                                    : "hover:bg-blue-700"
                                    }`}
                            >
                                Dashboard
                            </li>
                        </Link>

                        <Link href="/admin/students">
                            <li
                                className={`p-2 rounded cursor-pointer ${pathname === "/admin/students"
                                    ? "bg-blue-600"
                                    : "hover:bg-blue-700"
                                    }`}
                            >
                                Students
                            </li>
                        </Link>

                        <Link href="/admin/teachers">
                            <li
                                className={`p-2 rounded cursor-pointer ${pathname === "/admin/teachers"
                                    ? "bg-blue-600"
                                    : "hover:bg-blue-700"
                                    }`}
                            >
                                Teachers
                            </li>
                        </Link>
                        <Link href="/admin/slider">
                            <li
                                className={`p-2 rounded cursor-pointer ${pathname === "/admin/slider"
                                    ? "bg-blue-600"
                                    : "hover:bg-blue-700"
                                    }`}
                            >
                                Manage Hero Slides
                            </li>
                        </Link>
                    </ul>
                </div>

                {/* User Info */}
                {user && (
                    <div className="mt-10 bg-blue-800 p-3 rounded text-sm">
                        <p className="font-semibold">{user.email}</p>
                        <p className="text-gray-300 text-xs">Administrator</p>
                    </div>
                )}

                {/* Logout */}
                <div className="mt-auto">
                    <button
                        onClick={async () => {
                            await signOut(auth);
                            router.push("/login");
                        }}
                        className="w-full bg-red-500 hover:bg-red-600 p-2 rounded mt-6"
                    >
                        Logout
                    </button>
                </div>

            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                {/* Topbar */}
                <div className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="font-bold text-lg text-success">Admin Dashboard</h1>
                    {user && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm">{user.email}</span>
                        </div>
                    )}
                </div>

                <div className="p-8">
                    {children}
                </div>

            </div>
        </div>
    );
}