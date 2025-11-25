import { DM_Sans, Oswald } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
    weight: ["400", "500", "700"],
});

const oswald = Oswald({
    subsets: ["latin"],
    variable: "--font-oswald",
    weight: ["400", "500", "700"],
});

export const metadata = {
    title: "DevOP", // TITOLO AGGIORNATO QUI!
    description:
        "A soft-brutalist, bubblegum-tech portfolio for an AI/Full-Stack freelance duo.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
        <head>
            <meta name="apple-mobile-web-app-title" content="DevOP"/>
            <title>DevOP</title>
        </head>
        <body
            className={`
          ${dmSans.variable}
          ${oswald.variable}
          font-body
          antialiased
        `}
        >
        {children}
        </body>
        </html>
    );
}
