"use client";

import React, {useState} from "react";
import Header from "@/app/[pages]/components/Header";
import LoremText from "@/app/assets/loremText";
import ContactForm from "@/app/components/ContactForm";
import Footer from "@/app/components/Footer";


export default function Request ({namespace}: { namespace: string }) {


    const isMessageRequired = false;

    return (
        <>
            <Header width="450" namespace={namespace}/>


            <main className="flex-grow container mx-auto px-3"
                  style={{maxWidth: '450px'}}>


                <div>
                    <ContactForm
                        isMessageRequired={isMessageRequired}
                        namespace={namespace}
                        onSubmitSuccess={() => {
                        }}/>

                </div>

                {/*<HtmlString text={about('text')}/>*/}
                {/*<LoremText paragraphs={5}/>*/}


            </main>
            <Footer width="450" />
        </>
    )

}