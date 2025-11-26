import { DM_Sans, Oswald } from "next/font/google";
import "./globals.css";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import {Providers} from "@/app/[locale]/providers";

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
    title: "DevOP",
    appleWebApp: {
        title: "DevOP",
    },
    description:
        "A soft-brutalist, bubblegum-tech portfolio for an AI/Full-Stack freelance duo.",
};

export default async function RootLayout({ children, params }) {
    const { locale } = await params;

    const messages = await getMessages();

    return (
        <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
        <body
            className={`
              ${dmSans.variable}
              ${oswald.variable}
              font-body
              antialiased
            `}
        >
        <NextIntlClientProvider messages={messages}>
            <Providers>
                {children}
            </Providers>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
