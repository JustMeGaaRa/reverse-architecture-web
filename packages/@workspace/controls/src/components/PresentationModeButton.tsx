import { IconButton } from "@chakra-ui/react";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { Play, Xmark } from "iconoir-react";
import { FC } from "react";
import { usePresentationMode } from "../hooks";

export const PresentationModeButton: FC = () => {
    const { isPresentationEnabled } = useWorkspaceToolbarStore();
    const { togglePresentationMode } = usePresentationMode();

    return !isPresentationEnabled ? (
        <IconButton
            aria-label={"enable presentation mode"}
            icon={<Play />}
            title={"enable presentation mode"}
            onClick={() => togglePresentationMode()}
        />
    ) : (
        <IconButton
            aria-label={"exit presentation mode"}
            icon={<Xmark />}
            title={"exit presentation mode"}
            onClick={() => togglePresentationMode()}
        />
    )
}