import { IconButton } from "@chakra-ui/react";
import { ElementType } from "@structurizr/dsl";
import { Keyframe } from "iconoir-react";
import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementSoftwareSystemModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowSoftwareSystem,
        enableAddingElement
    } = useAddingElementMode();

    return allowSoftwareSystem && (
        <IconButton
            aria-label={"software system mode"}
            aria-selected={addingElementsEnabled && addingElementType === ElementType.SoftwareSystem}
            icon={<Keyframe />}
            title={"software system mode"}
            onClick={() => enableAddingElement(ElementType.SoftwareSystem)}
        />
    )
}