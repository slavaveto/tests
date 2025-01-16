'use client';

import LoremText from "@/app/assets/loremText";
import React, {useState, useEffect} from 'react';
import {supabase} from '@/app/assets/supabaseClient';
import {Button} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
import Footer from "@/app/components/Footer";
import Header from "@/app/[pages]/components/Header";
import LocalText from "@/app/assets/localText";
import InputList from "@/app/test/InputList";

import VariableHeightList from "./VariableHeightList";



export default function Test() {

    return (
        <>
            <div className="flex flex-col min-h-svh">


                <main
                    className="flex-grow container mx-auto px-3"
                    style={{maxWidth: '500px'}}>


                    <VariableHeightList />
{/*<InputList/>*/}


                </main>
                <Footer width="500"/>
            </div>

        </>

    );

}
