"use client";

import React from "react";
import Link from "next/link";
import {TbArrowBackUp} from "react-icons/tb";
import Footer from "@/app/components/Footer";
import LocalText from "@/app/assets/localText";
import ReturnHome from "@/app/assets/returnHome";

export default function SupportUkraine ({page_namespace}: { page_namespace: string }) {

    return (
<>
        <main className="flex-grow container mx-auto px-3 pt-[25px]"
              style={{maxWidth: '550px'}}>

            <div className="flex flex-col">
                <img width={150}
                     className="rounded mb-[20px]"
                     src="/support_ua.jpg"
                />

                <LocalText text={"content"} ns={"support_ua"}/>

                    <ReturnHome />

            </div>


</main>

    <Footer width="550" />
</>
)
}