import { DM_Sans, Oswald } from "next/font/google";
import "../globals.css";
import ClientLayout from "@/app/ClientLayout";

// 1. Importiamo i pezzi necessari per le traduzioni
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

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

// 2. La funzione diventa ASYNC e destrutturiamo params
export default async function RootLayout({ children, params }) {
    // Risolviamo la promise dei params per ottenere la lingua corrente
    const { locale } = await params;

    // Recuperiamo i messaggi (traduzioni) lato server
    const messages = await getMessages();

    return (
        // 3. Usiamo la variabile locale per l'attributo lang
        <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
        <body
            className={`
              ${dmSans.variable}
              ${oswald.variable}
              font-body
              antialiased
            `}
        >
        {/* 4. Il Provider deve avvolgere tutto il contenuto renderizzato */}
        <NextIntlClientProvider messages={messages}>
            <ClientLayout>
                {children}
            </ClientLayout>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
