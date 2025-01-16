"use client";

import React from "react";
import {Alert} from "@nextui-org/react";
import Link from "next/link";
import ReturnHome from "@/app/assets/returnHome";

import CustomAlert from "@/app/components/CustomAlert";

import LocalText from "@/app/assets/localText";
import {TbArrowBackUp} from "react-icons/tb";

import Footer from "@/app/components/Footer";

export default function Error ({namespace}: { namespace: string }) {

    return (
<>
        <main className="flex-grow container mx-auto">

            <div className=" fixed inset-0 flex items-center -justify-center mx-auto px-3
        translate-y-[-10%] xs450:translate-y-[-10%]"
                 style={{maxWidth: '550px',}}>


                <CustomAlert
                    color="danger"
                    showIcon={true}
                    title={<LocalText text={"error_title"} ns={`${namespace}`}/>}
                    description={<LocalText text={"error_text"} ns={`${namespace}`}/>
                }>

                    <div className="pl-0 flex w-full -justify-center   pb-[15px]">

                        <ReturnHome />



                    </div>

                </CustomAlert>




            </div>

        </main>

    <Footer width="550" />
</>
    )
}