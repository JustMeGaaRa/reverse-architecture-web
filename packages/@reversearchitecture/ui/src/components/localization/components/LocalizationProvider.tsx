import { FC, PropsWithChildren, useCallback, useState } from "react";
import { LocalizationContext } from "../contexts";

export const LocalizationProvider: FC<PropsWithChildren<{
    defaultLocale?: string;
    defaultLocaleStrings?: Record<string, string>;
}>> = ({
    defaultLocale,
    defaultLocaleStrings,
    children
}) => {
    const [ locale, setLocale ] = useState(defaultLocale ?? "en-US");
    const [ locales, setLocales ] = useState(["en-US"]);
    const [ localeStringsMap ] = useState(new Map<string, Record<string, string>>([[
        defaultLocale ?? "en-US", defaultLocaleStrings ?? {}
    ]]));

    const setLocalizedStrings = useCallback((locale: string, strings: Record<string, string>) => {
        localeStringsMap.set(locale, strings);
        setLocales(Array.from(localeStringsMap.keys()));
    }, [localeStringsMap]);

    const getLocalizedString = useCallback((key: string) => {
        return localeStringsMap.has(locale) ? localeStringsMap.get(locale)[key] ?? key : key;
    }, [localeStringsMap, locale])

    return (
        <LocalizationContext.Provider
            value={{
                locale,
                locales,
                setLocale,
                setLocalizedStrings,
                getLocalizedString
            }}
        >
            {children}
        </LocalizationContext.Provider>
    )
}