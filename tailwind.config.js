/** @type {import('tailwindcss').Config} */
export default {
    content: [
        // همه فایل‌های داخل app/ که JSX یا TSX دارند
        "./app/**/*.{js,ts,jsx,tsx}",

        // اگر فولدر components دارید
        "./components/**/*.{js,ts,jsx,tsx}",

        // اگر فولدر pages دارید (برای پروژه‌های قدیمی Next.js)
        "./pages/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            // اینجا می‌توانید فونت‌ها یا رنگ‌های سفارشی اضافه کنید
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                vazir: ['Vazirmatn', 'sans-serif'],
            },
            colors: {
                // مثال: رنگ سفارشی
                primary: '#1E40AF',
            },
        },
    },
    plugins: [],
};