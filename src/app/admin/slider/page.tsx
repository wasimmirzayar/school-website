"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Slide = {
    id?: string;
    imageUrl: string;
    titleFa: string;
    titleEn: string;
    descFa: string;
    descEn: string;
    order: number;
};

export default function AdminSlides() {

    const [slides, setSlides] = useState<Slide[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [newSlide, setNewSlide] = useState<Slide>({
        imageUrl: "",
        titleFa: "",
        titleEn: "",
        descFa: "",
        descEn: "",
        order: 1
    });

    const loadSlides = async () => {

        const snapshot = await getDocs(collection(db, "slides"));

        const data: Slide[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as any)
        }));

        data.sort((a, b) => a.order - b.order);

        setSlides(data);
    };

    useEffect(() => {
        loadSlides();
    }, []);

    const uploadImage = async (file: File) => {

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        return data.url;
    };

    const addSlide = async () => {

        if (!imageFile) {
            alert("Please select an image");
            return;
        }

        const imageUrl = await uploadImage(imageFile);

        await addDoc(collection(db, "slides"), {
            ...newSlide,
            imageUrl
        });

        setNewSlide({
            imageUrl: "",
            titleFa: "",
            titleEn: "",
            descFa: "",
            descEn: "",
            order: slides.length + 1
        });

        setImageFile(null);

        loadSlides();
    };

    const deleteSlide = async (id: string) => {

        if (!confirm("Delete this slide?")) return;

        await deleteDoc(doc(db, "slides", id));

        loadSlides();
    };

    const updateSlide = async (
        id: string,
        field: string,
        value: any
    ) => {

        await updateDoc(doc(db, "slides", id), {
            [field]: value
        });

    };

    const changeImage = async (id: string, file: File) => {

        const imageUrl = await uploadImage(file);

        await updateDoc(doc(db, "slides", id), {
            imageUrl
        });

        loadSlides();
    };

    return (
        <div className="p-10 max-w-6xl mx-auto">

            <h1 className="text-3xl font-bold mb-10">
                Manage Hero Slides
            </h1>

            {/* Add new slide */}

            <div className="border p-6 rounded-xl mb-10 space-y-4">

                <h2 className="font-bold text-xl">
                    Add New Slide
                </h2>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                    }
                />

                {imageFile && (
                    <Image
                        src={URL.createObjectURL(imageFile)}
                        alt="preview"
                        width={200}
                        height={120}
                        className="rounded"
                    />
                )}

                <input
                    className="border p-2 w-full"
                    placeholder="Title FA"
                    value={newSlide.titleFa}
                    onChange={(e) =>
                        setNewSlide({
                            ...newSlide,
                            titleFa: e.target.value
                        })
                    }
                />

                <input
                    className="border p-2 w-full"
                    placeholder="Title EN"
                    value={newSlide.titleEn}
                    onChange={(e) =>
                        setNewSlide({
                            ...newSlide,
                            titleEn: e.target.value
                        })
                    }
                />

                <textarea
                    className="border p-2 w-full"
                    placeholder="Description FA"
                    value={newSlide.descFa}
                    onChange={(e) =>
                        setNewSlide({
                            ...newSlide,
                            descFa: e.target.value
                        })
                    }
                />

                <textarea
                    className="border p-2 w-full"
                    placeholder="Description EN"
                    value={newSlide.descEn}
                    onChange={(e) =>
                        setNewSlide({
                            ...newSlide,
                            descEn: e.target.value
                        })
                    }
                />

                <button
                    onClick={addSlide}
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                    Add Slide
                </button>

            </div>

            {/* Slides List */}

            <div className="space-y-6">

                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="border rounded-xl p-4 space-y-4"
                    >

                        <div className="flex gap-6 items-center">

                            <div className="relative w-40 h-24">

                                <Image
                                    src={slide.imageUrl}
                                    alt="slide"
                                    fill
                                    className="object-cover rounded"
                                />

                            </div>

                            <div className="flex-1 space-y-2">

                                <input
                                    className="border p-2 w-full"
                                    defaultValue={slide.titleFa}
                                    onBlur={(e) =>
                                        updateSlide(
                                            slide.id!,
                                            "titleFa",
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    className="border p-2 w-full"
                                    defaultValue={slide.titleEn}
                                    onBlur={(e) =>
                                        updateSlide(
                                            slide.id!,
                                            "titleEn",
                                            e.target.value
                                        )
                                    }
                                />

                                <textarea
                                    className="border p-2 w-full"
                                    defaultValue={slide.descFa}
                                    onBlur={(e) =>
                                        updateSlide(
                                            slide.id!,
                                            "descFa",
                                            e.target.value
                                        )
                                    }
                                />

                                <textarea
                                    className="border p-2 w-full"
                                    defaultValue={slide.descEn}
                                    onBlur={(e) =>
                                        updateSlide(
                                            slide.id!,
                                            "descEn",
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <input
                                type="number"
                                defaultValue={slide.order}
                                className="border p-2 w-20"
                                onBlur={(e) =>
                                    updateSlide(
                                        slide.id!,
                                        "order",
                                        Number(e.target.value)
                                    )
                                }
                            />

                            <button
                                onClick={() => deleteSlide(slide.id!)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>

                        </div>

                        {/* Change Image */}

                        <div className="flex gap-4 items-center">

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) changeImage(slide.id!, file);
                                }}
                            />

                            <span className="text-sm text-gray-500">
                                Change Image
                            </span>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}