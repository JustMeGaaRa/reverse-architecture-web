import { ReverseArchitectureTheme } from "@reversearchitecture/workspace-viewer";
import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceThemeContext } from "./context";

export const WorkspaceThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ theme, setTheme ] = useState(ReverseArchitectureTheme);

    return (
        <WorkspaceThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </WorkspaceThemeContext.Provider>
    )
};