import { IconButton } from "@chakra-ui/react";
import { ElementType } from "@structurizr/dsl";
import { KeyframesCouple } from "iconoir-react";
import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementContainerModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowContainer,
        enableAddingElement
    } = useAddingElementMode();

    return allowContainer && (
        <IconButton
            aria-label={"container mode"}
            aria-selected={addingElementsEnabled && addingElementType === ElementType.Container}
            icon={<KeyframesCouple />}
            title={"container mode"}
            onClick={() => enableAddingElement(ElementType.Container)}
        />
    )
}