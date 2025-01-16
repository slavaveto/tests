"use client";
import React from "react";
import LocalText from "@/app/assets/localText";

export default function Avatar() {

    return (
        <>
            <div
                className="flex flex-row items-center justify-between -pr-[20px] -xs450:justify-center -xs450:pr-6 -xs390:gap-10">
                <img
                    src="/me.jpg"
                    alt="Описание изображения"
                    className="block dark:hidden w-[120px] rounded-full  border-3 border-white"
                    style={{boxShadow: "0 0px 10px rgba(0, 0, 0, 0.2)"}}
                />
                <img
                    src="/me_dark.jpg"
                    alt="Описание изображения"
                    className="hidden dark:block w-[120px] rounded-full  border-0"
                    style={{boxShadow: "0 0px 10px rgba(0, 0, 0, 0.2)"}}
                />
                <div className="flex w-full justify-end -items-center -justify-center mt-[2px]">
                    <div className="-pl-10  ">
                        <p className="font-medium text-[26px] xs375:text-[29px] xs414:text-[30px] xs450:text-[32px] leading-5 pb-1"><LocalText text="title" ns="home"/></p>
                        <p className="leading-4 text-sm italic w-full text-right -text-center pr-[5px]"><LocalText text="subtitle" ns="home"/> </p>
                    </div>
                </div>

            </div>
            <LocalText text="greeting" ns="home"/>

        </>

    );
}

