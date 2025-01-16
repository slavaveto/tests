import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

const SortableItem: React.FC<{
    id: string;
    text: string;
    height: number;
    draggingId: string | null;
}> = ({ id, text, height, draggingId }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? undefined : transition,
        opacity: isDragging ? 1 : 1,
        height,
        display: "flex",
        alignItems: "center",
        backgroundColor: draggingId === id ? "#f9f9f9" : "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "8px",
        padding: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <div
                {...listeners}
                style={{
                    cursor: "grab",
                    marginRight: "12px",
                    display: "flex",
                    alignItems: "center",
                }}
                onClick={(e) => e.stopPropagation()} // Предотвращаем клик на перетаскивании
            >
                <GripVertical size={20} />
            </div>
            <div style={{ flex: 1 }}>{text}</div>
        </div>
    );
};

export default SortableItem;