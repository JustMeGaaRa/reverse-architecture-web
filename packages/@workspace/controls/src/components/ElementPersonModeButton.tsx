import { IconButton } from "@chakra-ui/react";
import { ElementType } from "@structurizr/dsl";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { User } from "iconoir-react";
import { FC } from "react";
import { useAddingElementMode } from "../hooks";

export const ElementPersonModeButton: FC = () => {
    const { isAddingElementEnabled, addingElementType } = useWorkspaceToolbarStore();
    const { allowPerson, enableAddingElement } = useAddingElementMode();

    return allowPerson && (
        <IconButton
            aria-label={"person mode"}
            aria-selected={isAddingElementEnabled && addingElementType === ElementType.Person}
            icon={<User />}
            title={"person mode"}
            onClick={() => enableAddingElement(ElementType.Person)}
        />
    )
}