import { useTranslation } from 'react-i18next';

import { LANGUAGE, changeLanguage } from '@/lib/i18n';

interface ILanguageOptions {
  label: string;
  value: LANGUAGE;
}

interface IUseLanguage {
  language: LANGUAGE;
  languageCode: string;
  languages: Record<LANGUAGE, ILanguageOptions>;
  languageOptions: ILanguageOptions[];
  changeLanguage: (language: LANGUAGE) => void;
}

const languages: Record<LANGUAGE, ILanguageOptions> = {
  [LANGUAGE.English]: {
    value: LANGUAGE.English,
    label: 'en'
  },
  [LANGUAGE.Chinese]: {
    value: LANGUAGE.Chinese,
    label: 'zh'
  }
};

export const useLanguage = (): IUseLanguage => {
  const {
    i18n: { language }
  } = useTranslation();

  const currentLanguage = language as LANGUAGE;
  const languageCode = currentLanguage.split('_')[0];
  const languageOptions = Object.values(languages);

  return {
    language: currentLanguage,
    languages,
    languageCode,
    languageOptions,
    changeLanguage
  };
};
