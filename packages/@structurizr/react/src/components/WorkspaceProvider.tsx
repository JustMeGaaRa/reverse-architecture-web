import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceContext } from "../contexts";

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ workspace, setWorkspace ] = useState<IWorkspaceSnapshot>({
        name: "",
        description: "",
        version: 0,
        lastModifiedDate: new Date().toUTCString(),
        model: {
            groups: [],
            people: [],
            softwareSystems: [],
            deploymentEnvironments: [],
            relationships: []
        },
        views: {
            systemContexts: [],
            containers: [],
            components: [],
            deployments: [],
            configuration: {
                themes: [],
                styles: {
                    elements: [],
                    relationships: []
                }
            }
        }
    });

    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
            {children}
        </WorkspaceContext.Provider>
    )
}