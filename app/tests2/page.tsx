'use client';

import { useState, useEffect } from 'react';

export default function WordTooltip() {
    const [selectedWord, setSelectedWord] = useState<string | null>(null); // Выбранное слово
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null); // Позиция слова
    const tooltipHeight = 40; // Примерная высота тултипа (можно настроить)
    const tooltipOffset = 65; // Отступ сверху над словом

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const selection = window.getSelection();
        const word = selection?.toString().trim();

        if (word) {
            const range = selection?.getRangeAt(0); // Получаем выделенный текст
            const rect = range?.getBoundingClientRect(); // Координаты выделенного текста

            if (rect) {
                // Проверяем, помещается ли тултип сверху
                const canShowAbove = rect.top > tooltipHeight + tooltipOffset;

                const tooltipTop = canShowAbove
                    ? rect.top + window.scrollY - tooltipOffset // Если место есть, размещаем сверху
                    : rect.bottom + window.scrollY + 10; // Если нет места, размещаем снизу

                const tooltipLeft = rect.left + window.scrollX; // Учитываем горизонтальную прокрутку

                setPosition({
                    top: tooltipTop,
                    left: tooltipLeft,
                });

                setSelectedWord(word); // Сохраняем выделенное слово
            }
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
        <div style={{ position: 'relative', padding: '20px', minHeight: '200px' }}>
            <div
                onDoubleClick={handleDoubleClick}
                style={{
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    cursor: 'pointer',
                }}
            >
                Дважды кликните на любое слово из этого текста, чтобы увидеть его в тултипе.
            </div>

            {selectedWord && position && (
                <div
                    style={{
                        position: 'absolute',
                        top: position.top, // Используем вычисленные координаты
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