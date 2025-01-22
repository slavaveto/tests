"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import LangToggle from "@/app/components/LangToggle";


export default function Footer ({ width }: { width: string }) {

    //console.log(width);

    return (
        <footer className="footer_bg flex --h-[65px] pt-[10px] pb-[15px] md:pt-[15px] md:pb-[18px] mt-[35px] items-center ">
            <div className="container flex mx-auto px-3 -justify-between justify-end items-center"
                 style={{ maxWidth: `${width}px`}}>
                {/*<div>*/}
                {/*    <p className="font-medium text-lg leading-4 pb-1">Вячеслав Вето</p>*/}
                {/*    <p className="leading-4 text-sm italic">персональный сайт психолога</p>*/}
                {/*</div>*/}
                <div className="flex justify-end">
                    <div className="flex flex-col pr-2">
                        {/*<LangToggle/>*/}
                    </div>
                    <div className="flex flex-col">
                        {/*<ThemeToggle/>*/}
                    </div>
                </div>
            </div>
        </footer>
);
}

