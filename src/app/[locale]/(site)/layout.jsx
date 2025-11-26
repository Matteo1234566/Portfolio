import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/app/[locale]/(site)/sections/Navbar";
import React from "react";

export default async function SiteLayout({ children, params }) {

    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            {children}
        </NextIntlClientProvider>
    )
}
