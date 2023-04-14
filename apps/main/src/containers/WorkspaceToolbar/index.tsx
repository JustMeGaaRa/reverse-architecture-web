import {
    IconButton
} from "@chakra-ui/react";
import {
    ToolbalSection,
    Toolbar
} from "@reversearchitecture/ui";
import {
    BinMinus,
    ChatAdd,
    Circle,
    CursorPointer,
    DragHandGesture,
    Play,
    Redo,
    Rhombus,
    Square,
    Triangle,
    Undo
} from "iconoir-react";
import { FC, useEffect, useState } from "react";

export const WorkspaceToolbar: FC<{
    
}> = ({

}) => {
    return (
        <Toolbar>
            <ToolbalSection>
                <IconButton
                    aria-label={"cursor"}
                    title={"cursor"}
                    icon={<CursorPointer />}
                    />
                <IconButton
                    aria-label={"drag"}
                    title={"drag"}
                    icon={<DragHandGesture />}
                />
            </ToolbalSection>
            
            <ToolbalSection>
                <IconButton
                    aria-label={"person"}
                    title={"person"}
                    icon={<Square />}
                />
                <IconButton
                    aria-label={"software system"}
                    title={"software system"}
                    icon={<Circle />}
                />
                <IconButton
                    aria-label={"container"}
                    title={"container"}
                    icon={<Triangle />}
                />
                <IconButton
                    aria-label={"component"}
                    title={"component"}
                    icon={<Rhombus />}
                />
            </ToolbalSection>

            <ToolbalSection>
                <IconButton
                    aria-label={"comment"}
                    title={"comment"}
                    icon={<ChatAdd />}
                />
            </ToolbalSection>

            <ToolbalSection>
                <IconButton
                    aria-label={"delete selected element"}
                    icon={<BinMinus />}
                    title={"delete selected"}
                />
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
            </ToolbalSection>

            <ToolbalSection>
                <IconButton
                    aria-label={"presentation"}
                    title={"presentation"}
                    icon={<Play />}
                />
            </ToolbalSection>
        </Toolbar>
    )
}