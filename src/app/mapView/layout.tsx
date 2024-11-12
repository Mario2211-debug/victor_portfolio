import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Radio Streaming",
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}

        </>
    )
}