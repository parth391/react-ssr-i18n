import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <LaravelReactI18nProvider
                lang={'en'}
                fallbackLang={'en'}
                resolve={async (lang) => {
                    const langs = import.meta.glob('/lang/*.json');
                    try {
                        return await langs[`/lang/${lang}.json`]();
                    } catch (e) {
                        //
                    }
                }}>
                <App {...props} />
            </LaravelReactI18nProvider>
        );
    },
});

InertiaProgress.init({ color: '#4B5563' });
