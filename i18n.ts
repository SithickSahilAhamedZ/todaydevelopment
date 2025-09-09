import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: string;
}

const resources: Record<Language, Translations> = {
  en: {
    home: 'Home',
    navigation: 'Navigation',
    booking: 'Booking',
    emergency: 'Emergency',
    report: 'Report',
    gallery: 'Gallery',
    language: 'Language',
  },
  hi: {
    home: 'होम',
    navigation: 'नेविगेशन',
    booking: 'बुकिंग',
    emergency: 'आपातकाल',
    report: 'रिपोर्ट',
    gallery: 'गेलरी',
    language: 'भाषा',
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // FIX: Check for localStorage availability before accessing it.
    if (typeof window !== 'undefined' && window.localStorage) {
        return (localStorage.getItem('language') as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    // FIX: Check for localStorage availability before accessing it.
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const t = (key: string): string => {
    return resources[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};