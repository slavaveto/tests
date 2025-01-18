'use client';

import {loremIpsum} from 'lorem-ipsum';
import {useEffect, useState} from 'react';
import parse from "html-react-parser";

interface LoremTextProps {
    paragraphs: number;
    onLoad?: (isLoaded: boolean, error?: Error) => void; // Callback с результатом загрузки
}

export default function LoremText({paragraphs, onLoad}: LoremTextProps) {
    const [content, setContent] = useState<string>('');
    useEffect(() => {
        const generateLoremText = async () => {
            try {
                // Задержка в 1 секунду после успешного выполнения блока try
                await new Promise((resolve) => setTimeout(resolve, 1000));

                let loremText = '';
                let firstLinePaddingTop = 'pt-[0px]';
                for (let i = 0; i < paragraphs; i++) {
                    if (i === 0) {
                        firstLinePaddingTop = 'pt-[0px]';
                    } else {
                        firstLinePaddingTop = 'pt-[10px]';
                    }
                    loremText = loremText.concat(
                        `<p class="font-bold ${firstLinePaddingTop} pb-[5px]">`,
                        loremIpsum({count: 1, units: 'sentence', sentenceUpperBound: 5}),
                        '</p>'
                    );
                    loremText = loremText.concat(
                        loremIpsum({
                            format: 'html',
                            count: 1,
                            units: 'paragraphs',
                            paragraphLowerBound: 3,
                            paragraphUpperBound: 10,
                        })
                    );
                }
                setContent(loremText); // Устанавливаем сгенерированный текст
            } catch (error) {
                console.error('Ошибка генерации текста:', error);
                //onLoad(false, error as Error); // Сообщаем об ошибке через callback
            } finally {
                //onLoad(true); // Сообщаем, что загрузка завершена успешно
                console.log('Генерация текста завершена'); // Гарантированно выполняется
            }
        };
        generateLoremText();
    }, [paragraphs, onLoad]);
    return <div>{parse(content)}</div>;
}