import { IconButton } from "@chakra-ui/react";
import { ElementType } from "@structurizr/dsl";
import { User } from "iconoir-react";
import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementPersonModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowPerson,
        enableAddingElement
    } = useAddingElementMode();

    return allowPerson && (
        <IconButton
            aria-label={"person mode"}
            aria-selected={addingElementsEnabled && addingElementType === ElementType.Person}
            icon={<User />}
            title={"person mode"}
            onClick={() => enableAddingElement(ElementType.Person)}
        />
    )
}