'use client';

import React, {useState, useCallback, useEffect} from 'react';
import {useRouter} from "next/navigation";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {Spinner} from "@nextui-org/react";
import Link from "next/link";
import {TbArrowBackUp} from "react-icons/tb";
import usePageTransition from "@/app/assets/usePageTransition";

let isFirstLoad = true;

export default function Page({namespace}: { namespace: string }) {

    const {
        isInternalTransition, hasCheckedTransition, animationReady, isExiting, showSpinner, handleNavigation
    } = usePageTransition(isFirstLoad, () => {
        isFirstLoad = false; // Сбрасываем глобальный флаг
    });

    return (
        <>
            {showSpinner  && (
                <div
                    className="fixed inset-0 flex justify-center items-center h-screen
                        translate-y-[-5vh] xs450:translate-y-[-5vh]">
                    <Spinner/>
                </div>
            )}

            <div
                className={`page-transition ${
                    isExiting ? 'page-transition-fadeout' : !animationReady ? 'page-transition-fadein' : ''
                }`}
            >

                <div className="flex flex-col min-h-svh">
                    <Header width="500" namespace={namespace} onNavigate={handleNavigation}/>

                    <main className="flex-grow container mx-auto px-3"
                          style={{maxWidth: '500px'}}>

                        {/*<LoremText paragraphs={2}/>*/}

                        <Link
                            href="/"
                            onClick={(e) => {
                                e.preventDefault(); // Предотвращаем стандартное поведение ссылки
                                handleNavigation(`/`); // Вызываем fade-out и навигацию
                            }}

                            className="flex items-center mr-[30px] text-default-500 --hover:text-primary-400 transition"
                        >
                            <TbArrowBackUp size={26} className="-ml-[4px] mt-[24px] font-medium"/>
                        </Link>

                    </main>
                    <Footer width="500"/>
                </div>
            </div>

        </>
    )
}
