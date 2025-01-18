"use client";
import React from "react";
import Link from "next/link";
import {TbArrowBackUp} from "react-icons/tb";
import LocalText from "@/app/assets/localText";

interface HeaderProps {
    width: string;
    namespace?: string;
    onNavigate: (href: string) => void; // Новый проп для обработки переходов
}

export default function Header({width, namespace, onNavigate}: HeaderProps) {
    return (
        <header className="-footer_bg -opacity-90 backdrop-blur-xl mb-[20px]"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}
        >
            <div className="container flex mx-auto px-3 flex-col  "
                 style={{maxWidth: `${width}px`}}>

                <div className="flex flex-row -md:hidden items-start">
                    {namespace !== "home" && (
                        <Link
                            href="/"
                            onClick={(e) => {
                                e.preventDefault(); // Предотвращаем стандартное поведение
                                onNavigate("/"); // Вызываем fade-out и навигацию
                            }}

                            className="flex items-center mr-[30px] text-default-500 --hover:text-primary-400 transition"
                        >
                            <TbArrowBackUp size={26} className="-ml-[4px] mt-[24px] font-medium"/>
                        </Link>
                    )}
                    <div className="text-2xl  pt-[25px] pb-[20px] text-primary -font-semibold leading-[26px]">
                        <LocalText text={"page_title"} ns={`${namespace}`}/>
                    </div>
                </div>

                {/*<div className="hidden -md:block flex flex-col items-start">*/}
                {/*    <Link*/}
                {/*        color="foreground"*/}
                {/*        href="/"*/}
                {/*        className="mt-5 mb-4 flex flex-row items-center text-default-500 hover:text-primary-400 transition"*/}
                {/*    >*/}
                {/*        /!*<IoIosArrowBack className="-ml-[8px]" size={26}/>*!/*/}
                {/*        <TbArrowBackUp size={26} className="-ml-[4px] font-medium"/>*/}
                {/*        /!*<p className=" mb-[1px] -font-semibold">{ui('return_home')}</p>*!/*/}
                {/*        <p className=" mb-[0px] -font-semibold ml-2">*/}
                {/*            <LocalText text={"return_home"} ns={`misc`}/>*/}
                {/*        </p>*/}
                {/*    </Link>*/}
                {/*    <div className="text-2xl -ml-[1px] pb-[20px] text-primary -font-semibold leading-[26px]">*/}
                {/*        <LocalText text={"page_title"} ns={`${namespace}`}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
        </header>
    )
}