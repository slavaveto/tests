import { GripVertical } from "lucide-react";

import React, { useState } from "react";
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
    const [items, setItems] = useState([
        { id: "1", text: "Элемент 1", height: 60 },
        { id: "2", text: "Элемент 2", height: 100 },
        { id: "3", text: "Элемент 3", height: 80 },
        { id: "4", text: "Элемент 4", height: 120 },
        { id: "5", text: "Элемент 5", height: 70 },
    ]);
    const [draggingId, setDraggingId] = useState<string | null>(null);

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

    const handleDragCancel = () => {
        setDraggingId(null);
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                <div
                    style={{
                        maxWidth: "400px",
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
                            draggingId={draggingId}
                        />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay>
                {draggingId ? (
                    <div
                        style={{
                            height: items.find((item) => item.id === draggingId)?.height,
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "8px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        }}
                    >
                        <div
                            style={{
                                cursor: "grab",
                                marginRight: "12px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <GripVertical size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                            {items.find((item) => item.id === draggingId)?.text}
                        </div>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default VariableHeightList;