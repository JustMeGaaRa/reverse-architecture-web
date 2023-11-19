import { IconButton } from "@chakra-ui/react";
import { Redo, Undo } from "iconoir-react";
import { FC } from "react"
import { Toolbar, ToolbarSection } from "../containers"

export const WorkspaceUndoRedoControls: FC = () => {
    return (
        <Toolbar>
            <ToolbarSection>
                <IconButton
                    aria-label={"undo last change"}
                    icon={<Undo />}
                    title={"undo last change"}
                />
                <IconButton
                    aria-label={"redo last change"}
                    icon={<Redo />}
                    title={"redo last change"}
                />
            </ToolbarSection>
        </Toolbar>
    )
}