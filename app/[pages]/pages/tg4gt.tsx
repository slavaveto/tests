"use client";

import React, {useEffect, useState, useRef} from "react";
import Header from "@/app/[pages]/components/Header";

import LoremText from "@/app/assets/loremText";
import Footer from "@/app/components/Footer";
import ContactForm from "@/app/components/ContactForm";
import LocalText from "@/app/assets/localText";

export default function Tg4gt({namespace}: { namespace: string }) {

    const isMessageRequired = false;

    const [activeTab, setActiveTab] = useState("description"); // Начальная вкладка


    return (

        <>

            <Header width="550" namespace={namespace} activeTab={activeTab} setActiveTab={setActiveTab}/>

            <main className="flex-grow container mx-auto px-3 pt-3"
                  style={{maxWidth: '550px'}}>

                {/*<LoremText paragraphs={5}/>*/}
                {activeTab === "description" && (
                    <div>
                        <LocalText text={"tab1_content"} ns={`${namespace}`}/>
                        {/*<LoremText paragraphs={6}/>*/}
                    </div>
                )}

                {activeTab === "i_want" && (
                    <div className="-max-w-[400px] -mx-auto">
                        <ContactForm
                            isMessageRequired={isMessageRequired}
                            namespace={namespace}
                            onSubmitSuccess={() => {
                            }}/>

                    </div>
                )}

                {activeTab === "payment" && (
                    <div>
                        <LoremText paragraphs={6}/>
                    </div>
                )}

            </main>

            <Footer width="550"/>
        </>

    )
}