import React from "react";
import { TbArrowBackUp } from "react-icons/tb";
import LocalText from "@/app/assets/localText";
import Link from "next/link";

interface ReturnHomeProps {
    onNavigateAction?: (href: string) => void; // Добавляем пропс для обработки перехода
}

const ReturnHome: React.FC<ReturnHomeProps> = ({ onNavigateAction }) => {
    return (
        <div className="flex w-full pt-[30px]">
            <Link
                className="flex flex-row text-primary-500 hover:text-primary-400 transition items-center"
                href="/"
                onClick={(e) => {
                    if (onNavigateAction) {
                        e.preventDefault(); // Предотвращаем стандартное поведение
                        onNavigateAction("/"); // Вызываем переданный обработчик
                    }
                }}
            >
                <TbArrowBackUp size={24} className="" />
                <span className="pl-4 text-[14px]">
                    <LocalText text="return_home" ns="misc" />
                </span>
            </Link>
        </div>
    );
};

export default ReturnHome;