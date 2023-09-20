import { Box, IconButton } from "@chakra-ui/react";
import { Redo, Undo } from "iconoir-react";
import { FC } from "react"
import { Toolbar, ToolbarSection } from "../components"

export const WorkspaceUndoRedoControls: FC = () => {
    return (
        <Box position={"absolute"} bottom={4} left={4}>
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
        </Box>
    )
}