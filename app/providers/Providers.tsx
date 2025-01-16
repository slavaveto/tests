'use client';

import {NextUIProvider} from '@nextui-org/react'
import i18n from "@/app/providers/I18nextProvider";
import {I18nextProvider} from 'react-i18next';
import {ThemeProvider} from '@/app/providers/ThemeProvider';

export function Providers({children}: { children: React.ReactNode }) {
    //const pathname = usePathname();

    return (
        <I18nextProvider i18n={i18n}>
            <NextUIProvider>
                <ThemeProvider>
                        {children}
                </ThemeProvider>
            </NextUIProvider>
        </I18nextProvider>
    )
}