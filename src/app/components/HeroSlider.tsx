"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Slide = {
    imageUrl?: string;
    titleFa?: string;
    titleEn?: string;
    descFa?: string;
    descEn?: string;
};

export default function HeroSlider({ locale }: { locale: string }) {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [current, setCurrent] = useState(0);

    const isFa = locale === "fa";

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const snapshot = await getDocs(collection(db, "slides"));

                const data = snapshot.docs
                    .map((doc) => doc.data() as Slide)
                    .filter((slide) => slide.imageUrl && slide.imageUrl !== "");

                console.log("Slides:", data);

                setSlides(data);
            } catch (err) {
                console.error("Error loading slides:", err);
            }
        };

        fetchSlides();
    }, []);

    useEffect(() => {
        if (!slides.length) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides]);

    if (!slides.length) {
        return (
            <div className="h-[600px] flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const slide = slides[current];

    if (!slide?.imageUrl) return null;

    return (
        <div className="relative w-full h-[600px] overflow-hidden">
            <Image
                src={slide.imageUrl}
                alt={isFa ? slide.titleFa ?? "" : slide.titleEn ?? ""}
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {isFa ? slide.titleFa : slide.titleEn}
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-2xl">
                    {isFa ? slide.descFa : slide.descEn}
                </p>
            </div>

            {/* Prev */}
            <button
                onClick={() =>
                    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
                }
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full"
            >
                ‹
            </button>

            {/* Next */}
            <button
                onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full"
            >
                ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-5 w-full flex justify-center gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-3 h-3 rounded-full ${i === current ? "bg-white" : "bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}