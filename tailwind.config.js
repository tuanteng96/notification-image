/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3699FF"
            }
        },
        fontFamily: {
            'sans': ['Be Vietnam Pro', 'system-ui'],
            'alegreya': ['Alegreya Sans', 'system-ui']
        }
    },
    plugins: [],
}