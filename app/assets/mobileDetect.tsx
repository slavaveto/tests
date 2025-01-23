'use client';

import { useEffect, useState } from 'react';
import MobileDetect from 'mobile-detect';

export default function DeviceDetect() {
    const [deviceType, setDeviceType] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        const md = new MobileDetect(window.navigator.userAgent);

        const isMobile = !!md.mobile(); // Локальная переменная
        const isTablet = !!md.tablet(); // Локальная переменная
        const isDesktop = !isMobile && !isTablet; // Локальная переменная

        setDeviceType({
            isMobile,
            isTablet,
            isDesktop,
        });

        // Применяем overflow: hidden для мобильных и планшетов
        if (isMobile || isTablet) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        }

        console.log('Device Type:', { isMobile, isTablet, isDesktop });

        // Очистка при размонтировании компонента
        return () => {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        };
    }, []);




    return (
        <>
        {/*<div style={{ position: 'fixed', bottom: 0, right: 0, padding: '10px', background: '#eee' }}>*/}
        {/*    <p>Mobile: {deviceType.isMobile ? 'Yes' : 'No'}</p>*/}
        {/*    <p>Tablet: {deviceType.isTablet ? 'Yes' : 'No'}</p>*/}
        {/*    <p>Desktop: {deviceType.isDesktop ? 'Yes' : 'No'}</p>*/}
        {/*</div>*/}
</>
    );
}