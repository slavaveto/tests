"use client";

import React, {useState} from "react";
import Header from "@/app/[pages]/components/Header";
import LoremText from "@/app/assets/loremText";
import Footer from "@/app/components/Footer";
import LocalText from "@/app/assets/localText";

export default function About ({namespace}: { namespace: string }) {


    return (
        <>
            <Header width="550" namespace={namespace}/>


            <main className="flex-grow container mx-auto px-3"
                  style={{maxWidth: '550px'}}>

                <LocalText text={"content"} ns={`${namespace}`}/>
                {/*<LoremText paragraphs={5}/>*/}


            </main>

            <Footer width="550" />
        </>
    )

}