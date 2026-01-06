import { useLang } from '@/stores/useLang';
import { I18n } from 'i18n-js';
import { langEn } from './en';
import { langLo } from './lo';
import { langVn } from './vn';

function useI18n() {
    const { lang } = useLang()

    const translations = {
        vn: langVn,
        en: langEn,
        lo: langLo,
    };
    const i18n = new I18n(translations);

    i18n.locale = lang;

    i18n.enableFallback = true;

    return i18n;
}

export default useI18n