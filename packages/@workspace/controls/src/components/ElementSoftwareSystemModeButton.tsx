import { IconButton } from "@chakra-ui/react";
import { ElementType } from "@structurizr/dsl";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { Keyframe } from "iconoir-react";
import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementSoftwareSystemModeButton: FC = () => {
    const { isAddingElementEnabled, addingElementType } = useWorkspaceToolbarStore();
    const { allowSoftwareSystem, enableAddingElement } = useAddingElementMode();

    return allowSoftwareSystem && (
        <IconButton
            aria-label={"software system mode"}
            aria-selected={isAddingElementEnabled && addingElementType === ElementType.SoftwareSystem}
            icon={<Keyframe />}
            title={"software system mode"}
            onClick={() => enableAddingElement(ElementType.SoftwareSystem)}
        />
    )
}