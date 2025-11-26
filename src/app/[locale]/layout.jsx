import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";

export default async function LocaleLayout({ children, params }) {

    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    )
}
