import { IViewDefinition } from "@structurizr/dsl";
import { WorkspaceNavigationContext, WorkspaceNavigationProvider } from "@workspace/core";
import { FC, PropsWithChildren, useContext } from "react";

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