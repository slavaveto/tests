'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/assets/supabaseClient';

interface DataLoaderProps {
    onLoadAction: (data: any[], isLoaded: boolean) => void; // Коллбэк для передачи данных и статуса загрузки
    isFirstLoad: boolean; // Новый проп для первого запуска
}

export default function DataLoader({ onLoadAction, isFirstLoad }: DataLoaderProps) {

    useEffect(() => {
        const fetchPages = async () => {

            const startTime = Date.now();

            try {
                // Имитация минимальной задержки для спиннера
                // await new Promise((resolve) => setTimeout(resolve, 10));

                // Запрос к базе данных
                const { data, error } = await supabase
                    .from('_pages')
                    .select('slug, page_key, order')
                    .order('order', { ascending: true });

                if (error) throw error;

                const elapsedTime = Date.now() - startTime;
                //console.log("date", elapsedTime)

                // const delay = Math.max(1000 - elapsedTime, 0); // Минимальная задержка в 500 мс

                // Устанавливаем разную задержку в зависимости от isFirstLoad
                const delay = isFirstLoad
                    ? Math.max(1000 - elapsedTime, 0) // Для первого запуска 2 секунды
                    : Math.max(300 - elapsedTime, 0); // Для последующих запусков 1 секунда

                // Добавляем задержку, если нужно
                if (delay > 0) {
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }

                // const elapsedTime2 = Date.now() - startTime;
                // console.log("date", elapsedTime2)

                // Передаём данные родительскому компоненту напрямую
                onLoadAction(
                    data.map(({ slug, page_key }) => ({ slug, page_key })), // Отфильтрованные данные
                    true
                );
            } catch (err) {
                console.error('Ошибка загрузки страниц:', err);

                // Сообщаем родительскому компоненту об ошибке
                onLoadAction([], false);
            } finally {
                //console.log('Загрузка страниц завершена.');
            }
        };

        fetchPages();
    }, [onLoadAction]);

    return null; // Этот компонент ничего не отображает
}