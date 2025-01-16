import React, { useEffect, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
    id: string;
    text: string;
    height: number;
    isChecked: boolean;
    onTextChange: (id: string, text: string) => void;
    onCheckboxChange: (id: string, isChecked: boolean) => void;
    overlay?: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({
                                                       id,
                                                       text,
                                                       height,
                                                       isChecked,
                                                       onTextChange,
                                                       onCheckboxChange,
                                                       overlay = false,
                                                   }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Автоматическая подгонка высоты textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onTextChange(id, e.target.value);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCheckboxChange(id, e.target.checked);
    };

    const itemStyle = {
        transform: overlay ? undefined : CSS.Transform.toString(transform),
        transition: overlay ? undefined : transition,
        opacity: isDragging ? 0.5 : 1,
        height: overlay ? undefined : `${height}px`,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "8px",
        padding: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    };

    return (
        <div ref={setNodeRef} style={itemStyle} {...attributes}>
            {/* Иконка для перетаскивания */}
            <div
                {...listeners}
                style={{
                    cursor: "grab",
                    marginRight: "12px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <GripVertical size={20} />
            </div>
            {/* Чекбокс */}
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{ marginRight: "8px" }}
            />
            {/* Текстовое поле */}
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                placeholder="Введите текст..."
                rows={1} // Начальная высота в 1 строку
                className="resize-none border px-2 py-1 w-full rounded"
                style={{
                    overflow: "hidden",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    borderColor: "#ddd",
                    boxSizing: "border-box",
                }}
            />
        </div>
    );
};

export default SortableItem;