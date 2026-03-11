import HeroSlider from "../components/HeroSlider";
import { getSlides } from "@/lib/getSlides";

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const slides = await getSlides();
    const isFa = locale?.toLowerCase() === "fa";

    return (
        <div>
            <HeroSlider locale={locale} />
            <div className="p-10 text-center">
                <h1 className="text-3xl font-bold">
                    {isFa
                        ? "به مکتب دانش خواهان غالب خوش آمدید"
                        : "Welcome to Bright Future School"}
                </h1>
            </div>
        </div>
    );
}