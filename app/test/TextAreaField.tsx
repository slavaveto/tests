import React, { useEffect, useRef } from "react";

interface TextAreaFieldProps {
    id: string;
    text: string;
    isChecked: boolean;
    rows: number;
    onTextChange: (id: string, text: string) => void;
    onCheckboxChange: (id: string, isChecked: boolean) => void;
    onKeyPress: (id: string, key: string, shiftKey: boolean) => void;
    textAreaRef: (textarea: HTMLTextAreaElement | null) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
                                                         id,
                                                         text,
                                                         isChecked,
                                                         rows,
                                                         onTextChange,
                                                         onCheckboxChange,
                                                         onKeyPress,
                                                         textAreaRef,
                                                     }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return (
        <div className="flex items-center w-full">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => onCheckboxChange(id, e.target.checked)}
                className="mr-2"
            />
            <textarea
                ref={(el) => {
                    textareaRef.current = el;
                    textAreaRef(el);
                }}
                value={text}
                onChange={(e) => onTextChange(id, e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onKeyPress(id, e.key, e.shiftKey);
                    }
                }}
                className="border px-2 py-1 rounded w-full resize-none overflow-hidden"
                rows={rows}
            />
        </div>
    );
};

export default TextAreaField;