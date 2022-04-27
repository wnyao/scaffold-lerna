import i18n from 'i18next';
import axios from 'axios';
import { initReactI18next } from 'react-i18next';

import { initMomentLocal } from './i18n.moment';
import { resolveMultipleTranslation, overloadTranslationOptionHandler } from './plugins';

export enum LANGUAGE {
  Chinese = 'zh_CN',
  English = 'en_US'
}

export const changeLanguage = async (lang: LANGUAGE) => {
  try {
    const { data } = await axios.get(`/${APP_PATH}/locales/${lang}/resource.json`);

    initMomentLocal(lang);
    i18n.addResourceBundle(lang, 'resource', data);
    await i18n.changeLanguage(lang);
  } catch {}
};

const getLanguage = (): LANGUAGE => LANGUAGE.English;
const language = getLanguage();

i18n.on('initialized', () => changeLanguage(language));

i18n
  .use(initReactI18next)
  .use(resolveMultipleTranslation)
  .init({
    lng: language || LANGUAGE.English,
    fallbackLng: LANGUAGE.English,
    load: 'languageOnly',
    debug: NODE_ENV === 'development',
    defaultNS: 'resource',
    ns: ['resource'],
    // send not translated keys to endpoint
    saveMissing: false,
    // we do not use keys in form messages.welcome
    keySeparator: false,
    nsSeparator: false,
    // react already safes from xss
    interpolation: { escapeValue: false },
    overloadTranslationOptionHandler,
    resources: {
      en_US: {},
      zh_CN: {}
    }
  });

export default i18n;
