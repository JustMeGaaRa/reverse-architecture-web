import { createDefaultWorkspace, IWorkspaceMetadata } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ElementContext, WorkspaceContext, WorkspaceMetadataContext } from "../contexts";

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ workspace, setWorkspace ] = useState(createDefaultWorkspace());

    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export const WorkspaceMetadataProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ metadata, setMetadata ] = useState<IWorkspaceMetadata>({
        lastModifiedDate: new Date(),
        name: "Workspace",
        views: {
            systemContexts: [],
            containers: [],
            components: [],
            deployments: [],
        }
    });

    return (
        <WorkspaceMetadataContext.Provider value={{ metadata, setMetadata }}>
            {children}
        </WorkspaceMetadataContext.Provider>
    )
}

export const ElementProvider: FC<PropsWithChildren<{
    isReadonly: boolean;
}>> = ({ children, isReadonly }) => {
    return (
        <ElementContext.Provider value={{ isReadonly }}>
            {children}
        </ElementContext.Provider>
    )
}