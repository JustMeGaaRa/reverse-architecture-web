import { Icon, IconButton } from "@chakra-ui/react"
import { useYjsCollaborative } from "@yjs/react";
import { CloudSync } from "iconoir-react";
import { FC, useEffect } from "react"
import { useLoaderState } from "../hooks";

export const WorkspaceSynchronizationIcon: FC = () => {
    const { persistance } = useYjsCollaborative();
    const [ isSynchronizing, onStartSync, onStopSync ] = useLoaderState({ isLoading: false });

    useEffect(() => {
        if (persistance?.whenSynced) {
            onStartSync();
            persistance.whenSynced.finally(() => onStopSync());
        }
    }, [onStartSync, onStopSync, persistance?.whenSynced]);

    return (
        <IconButton
            aria-label={"save"}
            colorScheme={"gray"}
            isLoading={isSynchronizing}
            icon={<Icon as={CloudSync} boxSize={5} />}
            size={"md"}
            variant={"ghost"}
        />
    )
}