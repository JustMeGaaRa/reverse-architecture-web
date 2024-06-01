import { createDefaultWorkspace, IWorkspaceSnapshot } from "@structurizr/dsl";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { ThemeProvider } from "./Themes";

export interface IWorkspace {
    title?: string;
    description?: string;
}

export const Workspace: FC<PropsWithChildren<{
    value: IWorkspace;
}>> = ({
    children,
    value
}) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
};

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ workspace, setWorkspace ] = useState(createDefaultWorkspace());

    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
            {children}
        </WorkspaceContext.Provider>
    )
};

export const WorkspaceContext = createContext<{
    workspace: IWorkspaceSnapshot;
    setWorkspace?: Dispatch<SetStateAction<IWorkspaceSnapshot>>;
}>({
    workspace: undefined,
    setWorkspace: () => { console.debug("Workspace Context: dummy setWorkspace") },
});

export const useWorkspace = () => {
    return useContext(WorkspaceContext);
};
