import { defineStore } from 'pinia'
import axios from 'axios';

function getCurrentLanguage(settingsNew) {

    const pathname = window.location.pathname
    const baseUrlLength = window.baseUrl.length
    let currentLanguage = pathname.substring(pathname.lastIndexOf('/') + 1).length === 2 ? pathname.substring(pathname.lastIndexOf('/') + 1) : pathname.split('/')[pathname.split('/').length - 2];

    currentLanguage = currentLanguage.length > 2 ? 'de' : currentLanguage;

    return currentLanguage || 'de';
};

export const useLanguageStore = () => {
    const store = defineStore('languagestore', {
        state: () => ({
            currentLanguage: null,
            settings: {}
        }),
        getters: {
            language: (state) => state.currentLanguage || getCurrentLanguage(state.settings),
            allLanguages: (state) => state?.settings?.data?.languages
        },
        actions: {
            getSettings() {
                axios.get(`${window.baseUrl}/json/settings.json`)
                    .then(data => {
                        this.settings = data;
                    })
                    .catch(err => console.error(err))
            },
            setCurrentLanguage(langCode) {
                this.currentLanguage = langCode;
            }
        }
    })();

    if (Object.keys(store.settings).length === 0) {
        store.getSettings();
    }

    return store;
};
