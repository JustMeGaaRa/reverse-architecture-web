import { IViewDefinition } from "@structurizr/dsl";
import { WorkspaceNavigationContext, WorkspaceNavigationProvider } from "@workspace/core";
import { FC, PropsWithChildren, useContext } from "react";

export const WorkspaceNavigationWrapper: FC<PropsWithChildren<{
    onViewChange?: (view: IViewDefinition) => void;
}>> = ({
    children,
    onViewChange,
}) => {
    const provider = useContext(WorkspaceNavigationContext);

    return provider === null || provider === undefined ? (
        <WorkspaceNavigationProvider onViewChange={onViewChange}>
            {children}
        </WorkspaceNavigationProvider>
    ) : (
        <>
            {children}
        </>
    )
}