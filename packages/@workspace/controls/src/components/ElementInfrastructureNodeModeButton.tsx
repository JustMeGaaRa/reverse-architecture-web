import { useWorkspaceToolbarStore } from "@workspace/core";
import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementInfrastructureNodeModeButton: FC = () => {
    const { isAddingElementEnabled, addingElementType } = useWorkspaceToolbarStore();
    const { allowSoftwareSystem, enableAddingElement } = useAddingElementMode();

    return allowSoftwareSystem && (
        <></>
    )
}