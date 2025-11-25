"use client";

import Navbar from "@/app/sections/Navbar";
import React from "react";
import {Providers} from "@/app/providers";
export default function ClientLayout({ children }) {

    return (
        <Providers>
            <Navbar />
            {children}
        </Providers>
    )
}
