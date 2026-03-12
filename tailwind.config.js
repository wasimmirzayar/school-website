export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",       // همه layout و صفحات
        "./components/**/*.{js,ts,jsx,tsx}", // همه کامپوننت‌ها
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                vazir: ["Vazirmatn", "sans-serif"],
            },
        },
    },
    plugins: [],
};