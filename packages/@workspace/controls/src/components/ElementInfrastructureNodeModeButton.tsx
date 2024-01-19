import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementInfrastructureNodeModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowInfrastructureNode,
        enableAddingElement
    } = useAddingElementMode();

    return allowInfrastructureNode && (
        <></>
    )
}