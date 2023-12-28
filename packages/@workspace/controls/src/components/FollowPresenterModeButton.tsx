import { IconButton } from "@chakra-ui/react";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { CursorPointer } from "iconoir-react";
import { FC } from "react";

export const FollowPresenterModeButton: FC = () => {
    const { isPresentationEnabled } = useWorkspaceToolbarStore();

    return isPresentationEnabled && (
        <IconButton
            aria-label={"follow presenter"}
            icon={<CursorPointer />}
            title={"follow presenter"}
        />
    )
}