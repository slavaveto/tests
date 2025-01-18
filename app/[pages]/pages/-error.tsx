"use client";

import React from "react";
import {Alert} from "@nextui-org/react";
import Link from "next/link";

import CustomAlert from "@/app/components/CustomAlert";

import LocalText from "@/app/assets/localText";
import {TbArrowBackUp} from "react-icons/tb";

import Footer from "@/app/components/Footer";
import usePageTransition from "@/app/assets/usePageTransition";


let isFirstLoad = false;

export default function Error ({namespace}: { namespace: string }) {

    const {
        isInternalTransition, hasCheckedTransition, isExiting, showSpinner, handleNavigation
    } = usePageTransition(isFirstLoad, () => {
        isFirstLoad = false; // Сбрасываем глобальный флаг
    });





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

                        <div className="flex w-full pt-[30px]">
                            <Link
                                className="flex flex-row text-primary-500 hover:text-primary-400 transition items-center"
                                href="/"
                            >
                                <TbArrowBackUp size={24} className=""/>
                                <span className="pl-4 text-[14px]">
                    <LocalText text="return_home" ns="misc"/>
                </span>
                            </Link>
                        </div>

                    </div>

                </CustomAlert>

            </div>

        </main>

    <Footer width="550"/>
</>
    )
}