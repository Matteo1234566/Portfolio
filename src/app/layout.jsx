import { DM_Sans, Oswald } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devop.sbs';

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
    metadataBase: new URL(siteUrl),
    title: {
        default: 'DevOP – AI & Full-Stack Freelance Duo',
        template: '%s | DevOP',
    },
    description:
        'Simone & Matteo — AI engineers and full-stack developers specializing in computer vision, deep learning, and scalable web systems.',
    appleWebApp: {
        title: 'DevOP',
    },
    manifest: '/manifest.json',
    openGraph: {
        type: 'website',
        siteName: 'DevOP',
    },
    twitter: {
        card: 'summary_large_image',
    },
};

export default function RootLayout({ children }) {


    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body
                className={`
                  ${dmSans.variable}
                  ${oswald.variable}
                  font-body
                  antialiased
                `}
            >
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
