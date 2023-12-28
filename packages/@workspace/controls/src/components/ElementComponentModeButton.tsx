import { IconButton } from "@chakra-ui/react";
import { ElementType } from "@structurizr/dsl";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { Keyframes } from "iconoir-react";
import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementComponentModeButton: FC = () => {
    const { isAddingElementEnabled, addingElementType } = useWorkspaceToolbarStore();
    const { allowComponent, enableAddingElement } = useAddingElementMode();

    return allowComponent && (
        <IconButton
            aria-label={"component mode"}
            aria-selected={isAddingElementEnabled && addingElementType === ElementType.Component}
            icon={<Keyframes />}
            title={"component mode"}
            onClick={() => enableAddingElement(ElementType.Component)}
        />
    )
}