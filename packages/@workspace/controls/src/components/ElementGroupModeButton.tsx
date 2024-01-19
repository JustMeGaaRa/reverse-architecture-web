import { IconButton } from "@chakra-ui/react";
import { ElementType } from "@structurizr/dsl";
import { KeyframePlusIn } from "iconoir-react";
import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementGroupModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowGroup,
        enableAddingElement
    } = useAddingElementMode();

    return allowGroup && (
        <IconButton
            aria-label={"group mode"}
            aria-selected={addingElementsEnabled && addingElementType === ElementType.Group}
            icon={<KeyframePlusIn />}
            title={"group mode"}
            onClick={() => enableAddingElement(ElementType.Group)}
        />
    )
}