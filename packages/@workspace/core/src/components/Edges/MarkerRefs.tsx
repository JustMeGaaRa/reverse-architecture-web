import { FC, PropsWithChildren } from "react";
import { WorkspaceElementPortal } from "../ReactFlow";

export const MarkerRefs: FC<PropsWithChildren> = ({ children }) => {
    return (
        <WorkspaceElementPortal selector={".react-flow__viewport"}>
            <svg className={"react-flow__edges react-flow__edges-markers"} style={{ position: "absolute" }}>
                <defs>
                    {children}
                </defs>
            </svg>
        </WorkspaceElementPortal>
    )
}