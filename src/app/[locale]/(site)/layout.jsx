"use client";

import Navbar from "@/app/[locale]/(site)/sections/Navbar";
import React from "react";
export default function SiteLayout({ children }) {

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
