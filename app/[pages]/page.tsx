import React from "react";
import { supabase } from "@/app/assets/supabaseClient";
import { redirect } from "next/navigation";

// Интерфейс для типа параметров страницы
interface PageProps {
    params: Promise<{
        pages: string; // Динамический сегмент URL
    }>;
}

export default async function Page({ params }: Awaited<PageProps>) {
    const resolvedParams = await params;
    const slug = resolvedParams.pages;

    try {
        // Запрашиваем данные из базы данных
        const { data, error } = await supabase
            .from("_pages") // Имя таблицы
            .select("page_key") // Указываем нужный столбец
            .eq("slug", slug) // Фильтруем по slug
            .single(); // Ожидаем одну запись

        if (error || !data?.page_key) {
            console.error("Ошибка загрузки или отсутствует page_key:", error);
            redirect("/error_page"); // Перенаправление в случае ошибки
            return null;
        }

        const pageNamespace = data.page_key; // Используем page_key как пространство имен

        // Динамически загружаем компонент
        const DynamicComponent = (await import(`@/app/[pages]/pages/${pageNamespace}`)).default;

        return <DynamicComponent namespace={pageNamespace} />;
    } catch (err) {
        console.error("Ошибка динамической загрузки компонента:", err);
        redirect("/error_page"); // Перенаправление в случае ошибки
        return null;
    }
}