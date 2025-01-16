import React, { useState, useEffect, useRef } from "react";
import {
    DndContext,
    closestCenter,
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const VariableHeightList = () => {
    const initialItems = [
        { id: "1", text: "Элемент 1", height: 60, isChecked: false },
        { id: "2", text: "Элемент 2\nСтрока 2", height: 80, isChecked: false },
        { id: "3", text: "Элемент 3\nСтрока 2\nСтрока 3", height: 100, isChecked: false },
        { id: "4", text: "Элемент 4", height: 60, isChecked: false },
        { id: "5", text: "Элемент 5\nСтрока 2", height: 80, isChecked: false },
    ];

    const [items, setItems] = useState(initialItems);
    const [draggingId, setDraggingId] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Обновление начальных высот на основе содержимого текстовых полей
        if (containerRef.current) {
            const updatedItems = items.map((item, index) => {
                const textarea = containerRef.current?.querySelectorAll("textarea")[index];
                const height = textarea ? textarea.scrollHeight : item.height;
                return { ...item, height };
            });
            setItems(updatedItems);
        }
    }, []);

    const handleDragStart = (event: any) => {
        setDraggingId(event.active.id);
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            setItems((prevItems) => arrayMove(prevItems, oldIndex, newIndex));
        }
        setDraggingId(null);
    };

    const handleTextChange = (id: string, newText: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        text: newText,
                        height: Math.max(60, 20 * newText.split("\n").length), // Обновляем высоту
                    }
                    : item
            )
        );
    };

    const handleCheckboxChange = (id: string, isChecked: boolean) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, isChecked } : item
            )
        );
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                <div
                    ref={containerRef}
                    style={{
                        maxWidth: "600px",
                        margin: "20px auto",
                        padding: "10px",
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                    }}
                >
                    {items.map((item) => (
                        <SortableItem
                            key={item.id}
                            id={item.id}
                            text={item.text}
                            height={item.height}
                            isChecked={item.isChecked}
                            onTextChange={handleTextChange}
                            onCheckboxChange={handleCheckboxChange}
                        />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay>
                {draggingId ? (
                    <SortableItem
                        id={draggingId}
                        text={
                            items.find((item) => item.id === draggingId)?.text || ""
                        }
                        height={
                            items.find((item) => item.id === draggingId)?.height ||
                            60
                        }
                        isChecked={
                            items.find((item) => item.id === draggingId)?.isChecked ||
                            false
                        }
                        overlay
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default VariableHeightList;