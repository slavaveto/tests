import React, { useState, useRef, useEffect } from "react";
import { GripVertical } from "lucide-react";

interface TextAreaFieldProps {
    id: number;
    text: string;
    isChecked: boolean;
    rows?: number; // Добавлено опциональное свойство rows
    onTextChange: (id: number, text: string) => void;
    onCheckboxChange: (id: number, isChecked: boolean) => void;
    onKeyPress: (id: number, key: string, shiftKey: boolean) => void;
    textAreaRef: (textarea: HTMLTextAreaElement | null) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
                                                         id,
                                                         text,
                                                         isChecked,
                                                         rows = 1, // Значение по умолчанию для rows
                                                         onTextChange,
                                                         onCheckboxChange,
                                                         onKeyPress,
                                                         textAreaRef,
                                                     }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Функция для автоизменения высоты textarea
    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Сбрасываем высоту
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем высоту по содержимому
        }
    };

    useEffect(() => {
        adjustHeight(); // Подстраиваем высоту при рендере и изменении текста
    }, [text]);

    return (
        <div className="flex items-center w-full max-w-lg px-4 mb-2 ">
            {/* Иконка для перетаскивания */}
            <div className="flex items-center mr-2 cursor-grab">
                <GripVertical size={20} />
            </div>
            {/* Чекбокс */}
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => onCheckboxChange(id, e.target.checked)}
                className="mr-2"
            />
            {/* Текстовое поле */}
            <textarea
                value={text}
                onChange={(e) => {
                    onTextChange(id, e.target.value); // Обновляем текст
                    adjustHeight(); // Подстраиваем высоту при каждом изменении
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (!e.shiftKey) {
                            e.preventDefault(); // Предотвращаем стандартный переход на новую строку
                            onKeyPress(id, e.key, e.shiftKey); // Обработка Enter
                        }
                    }
                }}
                ref={(el) => {
                    textareaRef.current = el;
                    textAreaRef(el); // Привязываем реф к родительскому обработчику
                }}
                placeholder="Введите текст..."
                className="border px-2 py-1 rounded w-full resize-none overflow-hidden"
                rows={rows} // Используем переданное значение rows
                style={{ lineHeight: "1.5" }} // Добавляем комфортное расстояние между строками
            />
        </div>
    );
};

export default TextAreaField;