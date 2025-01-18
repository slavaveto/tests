import React  from "react";
import {supabase} from "@/app/assets/supabaseClient";
import { redirect } from 'next/navigation';


export default async function Page({ params }: { params: { pages: string } }) {
    const slug = params.pages;

    const startTime = Date.now();

    // Получаем данные из базы данных
    const { data, error } = await supabase
        .from('_pages') // Имя вашей таблицы
        .select('page_key') // Указываем столбец, который нам нужен
        .eq('slug', slug) // Фильтруем по slug
        .single(); // Ожидаем одну запись

    if (error) {
        console.error('Ошибка загрузки page_key:', error);
        redirect('/error_page');
    }

    const pageKey = data?.page_key;
    //const pageNamespace = pageKey.split('_')[1]; // Извлекаем пространство имен

    const pageNamespace = pageKey;

    const elapsedTime = Date.now() - startTime;
    const delay = Math.max(10 - elapsedTime, 0); // Минимальная задержка в 500 мс
    if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Динамически загружаем компонент на основе page_namespace
    let DynamicComponent: React.FC<{ namespace: string }>;

    try {
        DynamicComponent = (await import(`@/app/[pages]/pages/${pageNamespace}`)).default;
    } catch (err) {
        console.error(`Ошибка загрузки компонента для ${pageNamespace}:`, err);
        redirect('/error_page'); // Перенаправляем на страницу ошибки
    }
    return (
        <>
                <DynamicComponent namespace={pageNamespace}/>
        </>
    );
}
