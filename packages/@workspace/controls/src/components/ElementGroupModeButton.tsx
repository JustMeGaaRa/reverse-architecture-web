import { IconButton } from "@chakra-ui/react";
import { ElementType } from "@structurizr/dsl";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { KeyframePlusIn } from "iconoir-react";
import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementGroupModeButton: FC = () => {
    const { isAddingElementEnabled, addingElementType } = useWorkspaceToolbarStore();
    const { allowGroup, enableAddingElement } = useAddingElementMode();

    return allowGroup && (
        <IconButton
            aria-label={"group mode"}
            aria-selected={isAddingElementEnabled && addingElementType === ElementType.Group}
            icon={<KeyframePlusIn />}
            title={"group mode"}
            onClick={() => enableAddingElement(ElementType.Group)}
        />
    )
}