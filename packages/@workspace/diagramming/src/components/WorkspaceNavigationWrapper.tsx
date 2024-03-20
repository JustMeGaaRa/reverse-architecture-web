import { IViewDefinition } from "@structurizr/dsl";
import { FC, PropsWithChildren, useContext } from "react";
import { WorkspaceContext, WorkspaceNavigationContext } from "../contexts";
import { WorkspaceNavigationProvider } from "./WorkspaceNavigationProvider";
import { WorkspaceProvider } from "./WorkspaceProvider";

export const WorkspaceNavigationWrapper: FC<PropsWithChildren<{
    initialView?: IViewDefinition;
}>> = ({
    children,
    initialView
}) => {
    const provider = useContext(WorkspaceNavigationContext);

    return provider === null || provider === undefined ? (
        <WorkspaceNavigationProvider initialView={initialView}>
            {children}
        </WorkspaceNavigationProvider>
    ) : (
        <>
            {children}
        </>
    )
}

export const WorkspaceWrapper: FC<PropsWithChildren> = ({ children }) => {
    const provider = useContext(WorkspaceContext);

    return provider === null || provider === undefined ? (
        <WorkspaceProvider>
            {children}
        </WorkspaceProvider>
    ) : (
        <>
            {children}
        </>
    )
}