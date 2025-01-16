'use client';

import LoremText from "@/app/assets/loremText";
import React, { useState, useEffect } from "react";
import Footer from "@/app/components/Footer";
import { Spinner } from "@nextui-org/react";

export default function Test() {
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
    const [isContentVisible, setIsContentVisible] = useState(false); // Состояние видимости контента

    useEffect(() => {
        const MIN_LOADING_TIME = 1000; // Минимальная задержка 1 секунда

        const loadContent = async () => {
            const startTime = Date.now();

            // Имитация загрузки данных
            await new Promise((resolve) => setTimeout(resolve, 500)); // Здесь может быть реальная загрузка данных

            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);


            setIsLoading(false);
        };

        loadContent();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Spinner size="lg" color="primary" />
                <span className="ml-4 text-primary">Загрузка...</span>
            </div>
        );
    }

    return (
        <div
            className={`flex flex-col min-h-screen transition-opacity duration-700 ${
                !isLoading ? "opacity-100" : "opacity-0"
            }`}
        >
            <main
                className="flex-grow container mx-auto px-3"
                style={{ maxWidth: "500px" }}
            >
                <div className="py-[20px]">
                <LoremText  paragraphs={3} />
                </div>

            </main>
            <Footer width="500" />
        </div>
    );
}