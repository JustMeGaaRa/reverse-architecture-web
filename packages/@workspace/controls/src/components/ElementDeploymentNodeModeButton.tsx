import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementDeploymentNodeModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowDeploymentNode,
        enableAddingElement
    } = useAddingElementMode();

    return allowDeploymentNode && (
        <></>
    )
}