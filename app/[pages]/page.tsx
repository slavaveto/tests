import React from "react";
import {supabase} from "@/app/assets/supabaseClient";
import { redirect } from 'next/navigation';
import FadeWrapper from "@/app/[pages]/components/FadeWrapper";


export default async function Page({ params }: { params: { pages: string } }) {
    const slug = params.pages;

    // Получаем данные из базы данных
    const { data, error } = await supabase
        .from('_pages') // Имя вашей таблицы
        .select('page_key') // Указываем столбец, который нам нужен
        .eq('slug', slug) // Фильтруем по slug
        .eq('is_active', true) // Учитываем только активные записи
        .single(); // Ожидаем одну запись

    if (error) {
        console.error('Ошибка загрузки page_key:', error);
        redirect('/error-page');
    }

    const pageKey = data?.page_key;
    //const pageNamespace = pageKey.split('_')[1]; // Извлекаем пространство имен

    const pageNamespace = pageKey;

    // Динамически загружаем компонент на основе page_namespace
    let DynamicComponent: React.FC<{ namespace: string }>;

    try {
        DynamicComponent = (await import(`@/app/[pages]/pages/${pageNamespace}`)).default;
    } catch (err) {
        console.error(`Ошибка загрузки компонента для ${pageNamespace}:`, err);
        redirect('/error-page'); // Перенаправляем на страницу ошибки
    }

    return (
        <FadeWrapper>
            <div className="flex flex-col min-h-svh">
                <DynamicComponent namespace={pageNamespace} />
            </div>
        </FadeWrapper>
    );
}
