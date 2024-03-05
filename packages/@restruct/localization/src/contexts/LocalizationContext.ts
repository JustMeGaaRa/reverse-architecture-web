import { createContext } from "react";

export const LocalizationContext = createContext<{
    locale: string;
    locales: string[];
    setLocale: (locale: string) => void;
    setLocalizedStrings: (locale: string, strings: Record<string, string>) => void;
    getLocalizedString: (key: string) => string;
}>(null);