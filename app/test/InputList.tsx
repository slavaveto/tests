import React, { useState, useRef, useEffect } from "react";
import TextAreaField from "./TextAreaField";

const InputList = () => {
    const [fields, setFields] = useState<
        { id: number; text: string; isChecked: boolean; rows: number }[]
    >([
        { id: Date.now() + 1, text: "Пример текста 1", isChecked: false, rows: 1 },
        { id: Date.now() + 2, text: "Пример текста 2\nСтрока 2\nСтрока 3", isChecked: false, rows: 3 },
        { id: Date.now() + 3, text: "Пример текста 3\nСтрока 2\nСтрока 3\nСтрока 4", isChecked: false, rows: 4 },
        { id: Date.now() + 4, text: "Пример текста 4", isChecked: false, rows: 1 },
        { id: Date.now() + 5, text: "Пример текста 5\nСтрока 2\nСтрока 3", isChecked: false, rows: 3 },
    ]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textAreaRefs = useRef<Map<number, HTMLTextAreaElement | null>>(new Map());

    const handleAddField = (index: number | null = null) => {
        const newField = { id: Date.now(), text: "", isChecked: false, rows: 1 };

        setFields((prevFields) => {
            const updatedFields =
                index === null
                    ? [...prevFields, newField] // Добавляем в конец списка
                    : [
                        ...prevFields.slice(0, index + 1), // Элементы до текущего
                        newField, // Новый элемент
                        ...prevFields.slice(index + 1), // Элементы после текущего
                    ];

            setTimeout(() => {
                // Перемещаем фокус в новый элемент
                const newFieldRef = textAreaRefs.current.get(newField.id);
                if (newFieldRef) {
                    newFieldRef.focus();
                }
            }, 0);

            return updatedFields;
        });
    };

    const handleRemoveEmptyFields = () => {
        setFields((prevFields) => prevFields.filter((field) => field.text.trim() !== ""));
    };

    const handleTextChange = (id: number, text: string) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id
                    ? {
                        ...field,
                        text,
                        rows: Math.max(1, text.split("\n").length), // Автоматически пересчитываем количество строк
                    }
                    : field
            )
        );
    };

    const handleCheckboxChange = (id: number, isChecked: boolean) => {
        setFields((prevFields) =>
            prevFields.map((field) => (field.id === id ? { ...field, isChecked } : field))
        );
    };

    const handleKeyPress = (id: number, key: string, shiftKey: boolean) => {
        if (key === "Enter" && !shiftKey) {
            const index = fields.findIndex((field) => field.id === id);
            handleAddField(index); // Добавляем новый элемент под текущим
        }
    };

    const handleClickOutsideTextAreas = (event: MouseEvent) => {
        const isClickOutsideInputs = !(event.target as HTMLElement).closest("textarea");
        if (isClickOutsideInputs) {
            handleRemoveEmptyFields(); // Удаляем все пустые поля
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideTextAreas);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideTextAreas);
        };
    }, []);

    return (
        <div
            className="relative w-full h-screen flex flex-col items-center justify-start pt-10 bg-gray-100"
            onClick={() => fields.length === 0 && handleAddField()} // Создание первого элемента
            ref={containerRef}
        >
            {fields.map((field, index) => (
                <TextAreaField
                    key={field.id}
                    id={field.id}
                    text={field.text}
                    isChecked={field.isChecked}
                    rows={field.rows} // Передаем количество строк
                    onTextChange={handleTextChange}
                    onCheckboxChange={handleCheckboxChange}
                    onKeyPress={handleKeyPress}
                    textAreaRef={(textarea) => textAreaRefs.current.set(field.id, textarea)} // Регистрируем реф
                />
            ))}
            {fields.length === 0 && (
                <span className="text-gray-400 cursor-pointer">Кликните, чтобы начать</span>
            )}
        </div>
    );
};

export default InputList;