import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import "./globals.css";
import { Providers } from "@/app/providers/Providers";
import { themeScript } from "@/app/assets/themeScript";
import React from "react"; // Обновите путь, если требуется
import DisableScroll from "@/app/assets/disableScroll";


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
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    // appleMobileWebAppCapable: "yes",
    // appleMobileWebAppStatusBarStyle: "default",
    // mobileWebAppCapable: "yes",
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


            {children}
            <DisableScroll />

        </Providers>
        </body>
        </html>
        );
        }