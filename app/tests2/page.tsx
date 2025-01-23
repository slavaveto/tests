'use client';

import { useState, useEffect } from 'react';

export default function WordTooltip() {
    const [selectedWord, setSelectedWord] = useState<string | null>(null); // Выбранное слово
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null); // Абсолютная позиция тултипа
    const [tapCount, setTapCount] = useState(0); // Счётчик для определения двойного тапа
    const tooltipOffset = 75; // Отступ сверху над словом

    const handleDoubleClickOrTap = () => {
        const selection = window.getSelection();
        const word = selection?.toString().trim();

        if (word) {
            const range = selection?.getRangeAt(0); // Получаем выделенный текст
            const rect = range?.getBoundingClientRect(); // Координаты выделенного текста

            if (rect) {
                // Вычисляем абсолютную позицию тултипа
                const absoluteTop = rect.top + window.scrollY - tooltipOffset; // Координаты относительно страницы
                const absoluteLeft = rect.left + window.scrollX; // Координаты относительно страницы

                setPosition({
                    top: absoluteTop,
                    left: absoluteLeft,
                });

                setSelectedWord(word); // Сохраняем выделенное слово
            }
        }
    };

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        handleDoubleClickOrTap(); // Обработка двойного клика на ПК
    };

    const handleTouchEnd = () => {
        setTapCount((prev) => prev + 1);

        setTimeout(() => {
            setTapCount(0); // Сбрасываем счётчик через 300 мс
        }, 300);

        if (tapCount === 1) {
            handleDoubleClickOrTap(); // Обработка двойного тапа
        }
    };

    const handleClose = () => {
        setSelectedWord(null); // Закрываем тултип
        setPosition(null);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            handleClose(); // Закрываем тултип при клике вне
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div
            style={{
                marginTop: '50px', // Устанавливаем `margin` для проверки
                padding: '20px',
                minHeight: '200px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '20px', // Увеличенный шрифт для мобильных
                lineHeight: '1.5',
            }}
            onDoubleClick={handleDoubleClick} // Обработка двойного клика на ПК
            onTouchEnd={handleTouchEnd} // Обработка двойного тапа на мобильных устройствах
        >
            Дважды кликните или тапните на любое слово из этого текста, чтобы увидеть его в тултипе.

            {selectedWord && position && (
                <div
                    style={{
                        position: 'absolute', // Абсолютная позиция тултипа
                        top: position.top,
                        left: position.left,
                        background: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                        whiteSpace: 'nowrap',
                    }}
                    onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие тултипа при клике на него
                >
                    <p style={{ margin: 0 }}>Выбранное слово:</p>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{selectedWord}</p>
                </div>
            )}
        </div>
    );
}