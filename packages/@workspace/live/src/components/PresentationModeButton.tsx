import { IconButton } from "@chakra-ui/react";
import { Play, Xmark } from "iconoir-react";
import { FC } from "react";
import { usePresentationMode, useWorkspaceRoom } from "../hooks";

export const PresentationModeButton: FC = () => {
    const { currentUser } = useWorkspaceRoom();
    const { presentationEnabled, presenterInfo, startPresenting, stopPresenting } = usePresentationMode();

    return presentationEnabled && currentUser.info?.username === presenterInfo?.username ? (
        <IconButton
            aria-label={"stop presenting"}
            icon={<Xmark />}
            title={"stop presenting"}
            onClick={() => stopPresenting()}
        />
    ) : (
        <IconButton
            aria-label={"start presenting"}
            icon={<Play />}
            title={"start presenting"}
            onClick={() => startPresenting()}
        />
    )
}