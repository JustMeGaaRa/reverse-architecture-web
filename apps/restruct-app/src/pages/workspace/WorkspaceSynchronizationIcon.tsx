import { Icon, IconButton } from "@chakra-ui/react"
import { useWorkspace } from "@structurizr/react";
import { Workspace } from "@structurizr/y-workspace";
import { useYjsCollaborative } from "@yjs/react";
import { CloudSync } from "iconoir-react";
import { FC, useCallback, useEffect } from "react"
import { useLoaderState } from "../../features";

export const WorkspaceSynchronizationIcon: FC = () => {
    const { document, persistance } = useYjsCollaborative();
    const [ isSynchronizing, onStartSync, onStopSync ] = useLoaderState({ isLoading: false });
    const { workspace } = useWorkspace();

    const handleOnSynchronizeClick = useCallback(() => {
        throw new Error("Not implemented");
    }, []);

    return (
        <IconButton
            aria-label={"save"}
            colorScheme={"gray"}
            isLoading={isSynchronizing}
            icon={<Icon as={CloudSync} boxSize={5} />}
            size={"md"}
            variant={"ghost"}
            onClick={handleOnSynchronizeClick}
        />
    )
}