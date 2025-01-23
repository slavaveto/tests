import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import "./globals.css";
import { Providers } from "@/app/providers/Providers";
import { themeScript } from "@/app/assets/themeScript";
import React from "react"; // Обновите путь, если требуется
import DisableScroll from "@/app/assets/disableScroll";

import DeviceDetect from '@/app/assets/mobileDetect';


const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});
const montserrat = Montserrat({
    display: "swap",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tests",
    description: "Психология, психотерапия, психологическое консультирование",
    icons: {
        icon: process.env.NODE_ENV === "development" ? "/favicon_local.png" : "/favicon.png",
    },
};

export default  function RootLayout({ children }: { children: React.ReactNode }) {




    return (
        // <html lang="en" suppressHydrationWarning>
        <html lang="en" className={montserrat.className} suppressHydrationWarning>
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: themeScript,
                }}
            />


        </head>
        <body>
        <Providers>
            <DeviceDetect />

            {children}
            {/*<DisableScroll />*/}

        </Providers>
        </body>
        </html>
        );
        }