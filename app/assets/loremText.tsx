'use client';

import { loremIpsum } from 'lorem-ipsum';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

interface NumberOfParagraphsProps {
    paragraphs: number;
}

export default function LoremText({ paragraphs }: NumberOfParagraphsProps) {
    const [content, setContent] = useState<string>(''); // Состояние для текста
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        const generateLoremText = async () => {
            //console.log('Начало генерации текста'); // Лог начала генерации
            await delay(0); // Задержка 1 секунда

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
                    loremIpsum({ count: 1, units: 'sentence', sentenceUpperBound: 5 }),
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
            setIsLoading(false); // Завершаем загрузку
            //console.log('Генерация текста завершена'); // Лог завершения генерации
        };

        generateLoremText();
    }, [paragraphs]);

    if (isLoading) {
        //console.log('Текст ещё генерируется...'); // Лог состояния загрузки
        return <div>Загрузка текста...</div>; // Отображение сообщения о загрузке
    }

    return <div>{parse(content)}</div>;
}
