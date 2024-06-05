import { Theme } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ThemesContext } from "../contexts";

export const Themes: FC<PropsWithChildren> = ({ children }) => {
    const [ themes, setThemes ] = useState<Array<Theme>>();

    return (
        <ThemesContext.Provider value={{ themes, setThemes }}>
            {children}
        </ThemesContext.Provider>
    )
}