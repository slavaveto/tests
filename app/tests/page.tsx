'use client';

import React, {useState, useCallback, useEffect} from 'react';
import {useRouter} from "next/navigation";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {Spinner} from "@nextui-org/react";
import LoremText from "@/app/assets/loremText";
import DataLoader from "@/app/assets/dataLoader";
import usePageTransition from "@/app/assets/usePageTransition";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    RadioGroup,
    Radio,
} from '@nextui-org/react';

import dynamic from 'next/dynamic';

const CustomEditor = dynamic(() => import( '@/app/tests/CkEditor' ), {ssr: false});

import Link from "next/link";

export default function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна

    useEffect(() => {
        if (isModalOpen) {
            // Disable enforced focus behavior
            const handleFocusOutside = (e: any) => {
                if (!document.querySelector(".nextui-modal")?.contains(e.target)) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            };

            // Add event listener to manage focus when modal is open
            document.addEventListener("focus", handleFocusOutside, true);

            // Cleanup event listener on modal close
            return () => {
                document.removeEventListener("focus", handleFocusOutside, true);
            };
        }
    }, [isModalOpen]);

    return (
        <>

            <div className="flex flex-col min-h-svh">

                <main className="flex-grow container mx-auto px-3"
                      style={{maxWidth: '500px'}}>

                    {/* Кнопка для открытия модального окна */}
                    <Button className={"mt-4 mb-10"} onPress={() => setIsModalOpen(true)}>Open Editor</Button>

                    <Modal
                        isOpen={isModalOpen} // Связываем состояние с видимостью модального окна
                        onClose={() => setIsModalOpen(false)} // Закрытие окна
                        size={"lg"}
                        placement="top"

                        isDismissable={false}
                        className="nextui-modal"


                    >
                        <ModalContent>

                            <ModalHeader className="flex flex-row items-center justify-between pr-14">

                            </ModalHeader>
                            <ModalBody className="pb-4">

                                <CustomEditor/>

                            </ModalBody>
                            <ModalFooter className="m-0 pt-0 flex items-center justify-end">

                            </ModalFooter>

                        </ModalContent>
                    </Modal>

                    <CustomEditor/>

                    {/*<LoremText paragraphs={2} onLoad={handleLoremLoad}/>*/}
                    {/*<LoremText paragraphs={2}/>*/}

                </main>
                {/*<Footer width="500"/>*/}
            </div>

        </>
    )
}
