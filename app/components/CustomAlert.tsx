import React from "react";
import { Alert } from "@nextui-org/react";
import classNames from "classnames";

// Интерфейс для пропсов
interface CustomAlertProps {
    color?: "danger" | "default" | "primary" | "secondary" | "success" | "warning";
    showIcon?: boolean;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    children?: React.ReactNode;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
                                                     color = "default",
                                                     showIcon = true,
                                                     title,
                                                     description,
                                                     children,
                                                 }) => {

    const color2:string = "bg-" + color + "-300";
    // Используем switch для определения класса для псевдоэлемента
    const getBeforeClass = (color: string): string => {
        switch (color) {
            case "danger":
                return "before:bg-danger-300";
            case "primary":
                return "before:bg-primary-300";
            case "secondary":
                return "before:bg-secondary-300";
            case "success":
                return "before:bg-success-300";
            case "warning":
                return "before:bg-warning-300";
            default:
                return "before:bg-default-300";
        }
    };
    return (
        <Alert
            classNames={{
                base: classNames(
                    "bg-default-50 dark:bg-content2 shadow-sm",
                    "relative before:content-[''] before:absolute before:z-10",
                    "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
                    "rounded-l-none border-l-0",
                    getBeforeClass(color), // Используем функцию для определения класса
                    "border", // Добавляем общий бордер
                    "border-default-200 dark:border-[1px] dark:border-default ", // Ярче бордер в темном режиме
                    "border-l-0 dark:border-l-0",
                    "py-[10px] px-[10px]",
                    "rounded-small"
                ),
                mainWrapper: "pt-[7px] text-medium pb-[8px] leading-[1.25] min-h-0",
                iconWrapper: showIcon ? "dark:bg-transparent" : "hidden",
                description: "pt-[15px]",
            }}
            color={color}
            //@ts-ignore
            title={title}
            description={description}
            variant="faded"
        >
            {children}
        </Alert>
    );
};

export default CustomAlert;