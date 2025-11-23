export default {
    darkMode: "class",
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                forest: "#1e1b4b",
                bubblegum: "#6366f1",
                ink: "#0f172a",
                paper: "#f8fafc",
                smoke: "#cbd5e1",
            },
            fontFamily: {
                display: ["var(--font-oswald)"],
                body: ["var(--font-dm-sans)"],
            },
            boxShadow: {
                soft: "0 4px 20px -2px rgba(15, 23, 42, 0.1)",
                hard: "4px 4px 0px 0px #0f172a",
                "hard-white": "4px 4px 0px 0px #f8fafc",
            },
        },
    },
    plugins: [],
};
