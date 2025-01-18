'use client';

import React, {useState, useCallback, useEffect} from 'react';
import {useRouter} from "next/navigation";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {Spinner} from "@nextui-org/react";
import LoremText from "@/app/assets/loremText";
import DataLoader from "@/app/assets/dataLoader";
import usePageTransition from "@/app/assets/usePageTransition";

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
    const router = useRouter();


    const { isInternalTransition, hasCheckedTransition, isExiting, showSpinner, handleNavigation } =
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
                <div
                    className="fixed inset-0 flex justify-center items-center h-screen
                        translate-y-[-5vh] xs450:translate-y-[-5vh]">
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

                {/*<div*/}
                {/*    style={{*/}
                {/*        opacity: isExiting ? 0 : isLoading ? 0 : 1,*/}
                {/*        transform: isExiting*/}
                {/*            ? 'translateY(10px)' // Сдвиг вниз при fade-out*/}
                {/*            : isLoading*/}
                {/*                ? 'translateY(10px)' // Сдвиг вверх при fade-in*/}
                {/*                : 'translateY(0px)', // Без сдвига в обычном состоянии*/}
                {/*        transition: 'opacity 500ms ease, transform 500ms ease',*/}
                {/*    }}*/}
                {/*>*/}

                    <div className="flex flex-col min-h-svh">
                        <Header width="500" namespace={"home"} onNavigateAction={handleNavigation}/>

                        <main className="flex-grow container mx-auto px-3"
                              style={{maxWidth: '500px'}}>

                            {/*<LoremText paragraphs={2} onLoad={handleLoremLoad}/>*/}
                            {/*<LoremText paragraphs={2}/>*/}

                            <div className="mt-5">
                                <h2 className="text-xl font-bold mb-4">Данные страниц:</h2>

                                <Link
                                    onClick={(e) => {
                                        e.preventDefault(); // Предотвращаем стандартное поведение ссылки
                                        handleNavigation(`/error_page`); // Вызываем fade-out и навигацию
                                    }}
                                    href={`/error_page`} // Для SEO и правого клика на ссылке
                                    style={{
                                        cursor: 'pointer',
                                        // textDecoration: 'none',
                                        // color: 'inherit',
                                    }}
                                >
                                    error_page
                                </Link>

                                <ul className="list-disc pl-5">
                                    {pages.map((page, index) => (
                                        <li key={index}>
                                            <strong>{page.page_key}</strong> —
                                            <Link
                                                onClick={(e) => {
                                                    e.preventDefault(); // Предотвращаем стандартное поведение ссылки
                                                    handleNavigation(`/${page.slug}`); // Вызываем fade-out и навигацию
                                                }}
                                                href={`/${page.slug}`} // Для SEO и правого клика на ссылке
                                                style={{
                                                    cursor: 'pointer',
                                                    // textDecoration: 'none',
                                                    // color: 'inherit',
                                                }}
                                            >
                                                {page.page_key}
                                            </Link>

                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </main>
                        <Footer width="500"/>
                    </div>
                </div>

            </>
            )
            }
