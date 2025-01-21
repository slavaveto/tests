"use client";

import React, {useState, useCallback, useEffect} from 'react';
import {Alert, Spinner} from "@nextui-org/react";
import Link from "next/link";

import ReturnHome from "@/app/assets/returnHome";


import CustomAlert from "@/app/components/CustomAlert";

import LocalText from "@/app/assets/localText";
import {TbArrowBackUp} from "react-icons/tb";

import Footer from "@/app/components/Footer";
import usePageTransition from "@/app/assets/usePageTransition";
import Header from "@/app/components/Header";


let isFirstLoad = true;

export default function Error ({namespace}: { namespace: string }) {

    const {
        isInternalTransition, hasCheckedTransition, isExiting, animationReady, showSpinner, handleNavigation
    } = usePageTransition(isFirstLoad, () => {
        isFirstLoad = false; // Сбрасываем глобальный флаг
    });



    return (
    <>
        {showSpinner  && (
            <div className="spinner">
                <Spinner/>
            </div>
        )}

        <div
            className={`page-transition ${
                isExiting ? 'page-transition-fadeout' : !animationReady ? 'page-transition-fadein' : ''
            }`}
        >

            <div className="flex flex-col min-h-svh">
                <Header width="500" namespace={namespace} onNavigateAction={handleNavigation}/>

                <main className="flex-grow container mx-auto px-3"
                      style={{maxWidth: '500px'}}>

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

                                <ReturnHome onNavigateAction={handleNavigation} />

                            </div>

                        </CustomAlert>

                    </div>

                </main>
                <Footer width="500"/>
            </div>
        </div>

    </>
    )
}