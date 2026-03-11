import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getSlides() {
    const querySnapshot = await getDocs(collection(db, "slides"));

    const slides = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return slides;
}