import { Icon } from "@chakra-ui/react";
import { useStore } from "@reactflow/core";
import { Lock } from "iconoir-react";
import { FC } from "react";

export const ElementLockedIcon: FC<{ nodeId?: string }> = ({ nodeId }) => {
    const isLocked = useStore(state => {
        const node = state.nodeInternals.get(nodeId);
        return !(node?.draggable === true || node?.draggable === undefined);
    });

    return isLocked && (
        <Icon
            as={Lock}
            boxSize={4}
            color={"gray.400"}
            position={"absolute"}
            top={2}
            right={2}
        />
    )
}