/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3699FF",
                danger: "#F64E60"
            }
        },
        fontFamily: {
            'sans': ['Be Vietnam Pro', 'system-ui'],
            'alegreya': ['Alegreya Sans', 'system-ui'],
            'ephesis': ['Ephesis', 'system-ui'],
            'play': ['Playfair Display', 'system-ui'],
            'gentium': ['Gentium Plus']
        }
    },
    plugins: [],
}