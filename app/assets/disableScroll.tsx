'use client';

import { useEffect } from 'react';

export default function DisableScroll() {
    useEffect(() => {
        const preventDefault = (e: TouchEvent) => e.preventDefault();
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 1) preventDefault(e);
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', preventDefault, { passive: false });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', preventDefault);
        };
    }, []);

    return null;
}