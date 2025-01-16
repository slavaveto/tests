'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { supabase } from "@/app/assets/supabaseClient";

// Поддерживаемые языки
const supportedLanguages = ['ru', 'uk']; // Русский и Украинский

// Функция для определения языка устройства
const getDeviceLanguage = () => {
    if (typeof window !== 'undefined' && navigator.language) {
        return navigator.language.split('-')[0]; // Убираем региональную часть (например, 'ru-RU' → 'ru')
    }
    return null; // Возвращаем null, если navigator недоступен
};

// Определяем язык устройства
const deviceLanguage = getDeviceLanguage();

// Устанавливаем язык: сохранённый, язык устройства или язык по умолчанию
const defaultLanguage =
    deviceLanguage && supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'ru';

// Функция для загрузки переводов из базы данных
const loadTranslationsFromDatabase = async () => {
    const tables = ['home', 'misc', 'about', 'request', 'message',
        'tg4gt', 'supervision', 'support_ua' , 'error']; // Таблицы с переводами
    const translations: any = {};

    try {
        for (const table of tables) {
            const { data, error } = await supabase.from(table).select('*');

            if (error) {
                console.error(`Error loading translations from ${table}:`, error.message);
                continue; // Переходим к следующей таблице, если произошла ошибка
            }

            supportedLanguages.forEach((lang) => {
                if (!translations[lang]) translations[lang] = {};
                translations[lang][table] = (data || []).reduce((acc: any, row: any) => {
                    if (row.item_id && row[lang]) {
                        acc[row.item_id] = row[lang];
                    }
                    return acc;
                }, {});
            });
        }
    } catch (error) {
        console.error('Error loading translations:', error);
    }

    return translations; // Возвращаем переводы
};

// Инициализация i18n
const initI18n = async () => {
    const resources = await loadTranslationsFromDatabase();

    i18n
        .use(initReactI18next)
        .init({
            resources, // Используем переводы из базы
            lng: defaultLanguage,
            fallbackLng: 'ru',
            // ns: ['home', 'about', 'misc'], // Добавьте все используемые namespaces
            // defaultNS: 'home', // Установите namespace по умолчанию
            interpolation: {
                escapeValue: false,
            },
        });
    // Выводим ресурсы в консоль
    //console.log("i18n Resources:", resources);
};

// Запускаем инициализацию
initI18n().catch((err) => console.error('Error initializing i18n:', err));

export default i18n;