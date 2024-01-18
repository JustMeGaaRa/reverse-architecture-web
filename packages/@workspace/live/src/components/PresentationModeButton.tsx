import { IconButton } from "@chakra-ui/react";
import { useSelectionMode } from "@workspace/core";
import { Play, Xmark } from "iconoir-react";
import { FC, useCallback } from "react";
import { usePresentationMode, useWorkspaceRoom } from "../hooks";

export const PresentationModeButton: FC = () => {
    const { currentUser } = useWorkspaceRoom();
    const { presentationEnabled, presenterInfo, startPresenting, stopPresenting } = usePresentationMode();
    const { setSelectionMode } = useSelectionMode();

    const handleOnStartPresenting = useCallback(() => {
        startPresenting();
        setSelectionMode(false);
    }, [setSelectionMode, startPresenting]);

    const handleOnStopPresenting = useCallback(() => {
        stopPresenting();
        setSelectionMode(true);
    }, [setSelectionMode, stopPresenting]);

    return presentationEnabled && currentUser.info?.username === presenterInfo?.username ? (
        <IconButton
            aria-label={"stop presenting"}
            icon={<Xmark />}
            title={"stop presenting"}
            onClick={handleOnStopPresenting}
        />
    ) : (
        <IconButton
            aria-label={"start presenting"}
            icon={<Play />}
            title={"start presenting"}
            onClick={handleOnStartPresenting}
        />
    )
}