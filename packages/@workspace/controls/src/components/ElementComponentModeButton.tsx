import { IconButton } from "@chakra-ui/react";
import { ElementType } from "@structurizr/dsl";
import { Keyframes } from "iconoir-react";
import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementComponentModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowComponent,
        enableAddingElement
    } = useAddingElementMode();

    return allowComponent && (
        <IconButton
            aria-label={"component mode"}
            aria-selected={addingElementsEnabled && addingElementType === ElementType.Component}
            icon={<Keyframes />}
            title={"component mode"}
            onClick={() => enableAddingElement(ElementType.Component)}
        />
    )
}