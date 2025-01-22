'use client';

import React, {useState, useCallback, useEffect} from 'react';
import {useRouter} from "next/navigation";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {Spinner} from "@nextui-org/react";
import LoremText from "@/app/assets/loremText";
import DataLoader from "@/app/assets/dataLoader";
import usePageTransition from "@/app/assets/usePageTransition";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, RadioGroup, Radio, } from '@nextui-org/react';


// import CustomEditor from "@/app/assets/editor";

import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import( '@/app/tests/CkEditor' ), {ssr: false});

import Link from "next/link";

type Page = {
    page_key: string;
    slug: string;
};

let isFirstLoad = true;

export default function Home() {
    const [pages, setPages] = useState<Page[]>([]);

    const [isLoremLoading, setIsLoremLoading] = useState(true);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна


    const {isInternalTransition, hasCheckedTransition, isExiting, showSpinner, handleNavigation} =
        usePageTransition(false, () => {
        });

    // const handleLoremLoad = useCallback((isLoaded: boolean) => {
    //     setIsLoremLoading(!isLoaded);
    // }, []); // Пустой массив зависимостей: функция не изменится

    const handleDataLoad = useCallback((data: Page[], isLoaded: boolean) => {
        setIsDataLoading(!isLoaded);
        isFirstLoad = false;
        if (isLoaded) {
            setPages(data); // Сохраняем загруженные данные
        }
    }, []);

    // Объединённое состояние загрузки
    //const isLoading = isLoremLoading || isDataLoading;
    const isLoading = isDataLoading;

    return (
        <>
            <DataLoader onLoadAction={handleDataLoad} isFirstLoad={isFirstLoad}/>

            {isLoading && isFirstLoad && (
                <div className="spinner">
                    <Spinner/>
                </div>
            )}

            <div
                className={`page-transition ${
                    isExiting
                        ? 'page-transition-fadeout'
                        : isLoading
                            ? 'page-transition-fadein'
                            : ''
                }`}
            >
                <div className="flex flex-col min-h-svh">
                    <Header width="500" namespace={"home"} onNavigateAction={handleNavigation}/>

                    <main className="flex-grow container mx-auto px-3"
                          style={{maxWidth: '500px'}}>








                        {/*<LoremText paragraphs={2} onLoad={handleLoremLoad}/>*/}
                        {/*<LoremText paragraphs={2}/>*/}

                    </main>
                    <Footer width="500"/>
                </div>
            </div>

        </>
    )
}
