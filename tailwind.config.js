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
            'gentium': ['Gentium Plus'],
            'georama': ['Georama', 'system-ui'],
            'thasadith': ['Thasadith', 'system-ui']
        },
        boxShadow: {
            xl: '0px 9px 16px 0px rgba(24, 28, 50, 0.25)',
            lg: '0px 0px 50px 0px rgba(82, 63, 105, 0.15)',
            sm: '0px 0px 20px 0px rgba(76, 87, 125, 0.02)'
        },
    },
    plugins: [],
}