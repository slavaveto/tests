import React from "react";
import { useTranslation } from "react-i18next";

interface LocalTextProps {
    text: string; // Используется для сложного текста
    ns: string;
}

const LocalText: React.FC<LocalTextProps> = ({ text, ns }) => {
    const { t } = useTranslation();
    const translatedText = t(text, { ns });
    const isRich = isRichText(translatedText);


    if (isRich) {
        // Если текст содержит HTML
        return <span className="some_rich_text" dangerouslySetInnerHTML={{__html: translatedText}} />;
    }

    // Если текст — просто строка
    return <span>{translatedText}</span>;
};

// Функция для проверки на HTML
const isRichText = (text: string): boolean => {
    const htmlTagPattern = /<\/?[a-z][\s\S]*>/i; // Проверка на наличие HTML-тегов
    return htmlTagPattern.test(text);
};

export default LocalText;