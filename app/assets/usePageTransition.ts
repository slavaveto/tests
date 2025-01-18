import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function usePageTransition(
    isFirstLoad: boolean,
    onFirstLoadComplete: () => void // Коллбэк для уведомления
    ) {
    const [isInternalTransition, setIsInternalTransition] = useState(false); // Внутренний переход
    const [hasCheckedTransition, setHasCheckedTransition] = useState(false); // Завершена ли проверка перехода
    const [isExiting, setIsExiting] = useState(false); // Эффект выхода
    const [showSpinner, setShowSpinner] = useState(isFirstLoad); // Видимость спиннера
    const [animationReady, setAnimationReady] = useState(false); // Готовность анимации


    const router = useRouter();

    // Проверка типа перехода
    useEffect(() => {
        const currentPath = window.location.pathname; // Текущий путь
        const previousPath = sessionStorage.getItem('previousPath'); // Предыдущий путь из sessionStorage
        const wasInternal = sessionStorage.getItem('wasInternalTransition') === 'true'; // Был ли внутренний переход

        console.log('currentPath:', currentPath);
        console.log('previousPath:', previousPath);
        console.log('wasInternal:', wasInternal);

        if (!previousPath) {
            // Если предыдущий путь отсутствует, это внешняя загрузка
            console.log('Page loaded from external source');
            setIsInternalTransition(false);
        } else if (previousPath === currentPath && !wasInternal) {
            // Если пути совпадают и внутреннего перехода не было, это перезагрузка
            console.log('Page was refreshed');
            setIsInternalTransition(false);
        } else {
            // Внутренний переход
            console.log('Internal transition');
            setIsInternalTransition(true);
        }

        // Обновляем состояние только после проверки
        setTimeout(() => {
            sessionStorage.setItem('previousPath', currentPath);
            sessionStorage.setItem('wasInternalTransition', 'false'); // Сбрасываем внутренний переход
            setHasCheckedTransition(true);
        }, 0);
    }, []);

    // Обработчик перехода
    const handleNavigation = useCallback(
        (href: string) => {
            setIsExiting(true); // Включаем fade-out
            sessionStorage.setItem('wasInternalTransition', 'true');
            setTimeout(() => {
                router.push(href); // Переход на новую страницу
            }, 500); // Длительность fade-out
        },
        [router]
    );

    // Управление спиннером для первой загрузки
    useEffect(() => {
        if (isFirstLoad) {
            const spinnerTimer = setTimeout(() => {
                setShowSpinner(false);
                onFirstLoadComplete(); // Уведомляем родительский компонент, что первая загрузка завершена
            }, 1000); // Спиннер виден 1 секунду

            return () => clearTimeout(spinnerTimer); // Очищаем таймер при размонтировании
        }
    }, [isFirstLoad, onFirstLoadComplete]);

    // Управление готовностью анимации
    useEffect(() => {
        if (!showSpinner) {
            const animationTimer = setTimeout(() => setAnimationReady(true), 10); // Анимация активируется с задержкой
            return () => clearTimeout(animationTimer); // Очищаем таймер при размонтировании
        }
    }, [showSpinner]);

    return {
        isInternalTransition,
        hasCheckedTransition,
        isExiting,
        showSpinner,
        animationReady,
        handleNavigation,
    };
}