import { Icon, IconButton } from "@chakra-ui/react";
import { Position, ReactFlowState, useReactFlow, useStore } from "@reactflow/core";
import { NodeToolbar } from "@reactflow/node-toolbar";
import { Toolbar, ToolbarProvider, ToolbarSection, ToolbarSubmenu, ToolbarSubmenuContent, ToolbarSubmenuTrigger } from "@workspace/toolbar";
import { BinMinusIn, CoinsSwap, Copy, Keyframe, KeyframePlusIn, Keyframes, KeyframesCouple, Lock, LockSlash, Square, User } from "iconoir-react";
import { FC, useCallback } from "react";

const nodeSelector = (state: ReactFlowState, nodeId?: string) => ({
    // TODO: fix this by using currently selected nodes instead of passing node id
    // isLocked: state.nodeInternals.get(nodeId)?.draggable,
    isLocked: false,
})

export const ElementOptionsToolbar: FC<{
    nodeId?: string;
}> = ({
    nodeId
}) => {
    const { isLocked } = useStore(state => nodeSelector(state, nodeId));
    const { setNodes } = useReactFlow();

    const handleOnClickLockNode = useCallback(() => {
        setNodes(nodes => {
            return nodes.map(node => node.id !== nodeId
                ? node
                : { ...node, draggable: false })
        });
    }, [nodeId, setNodes]);

    const handleOnClickUnlockNode = useCallback(() => {
        setNodes(nodes => {
            return nodes.map(node => node.id !== nodeId
                ? node
                : { ...node, draggable: true })
        });
    }, [nodeId, setNodes]);

    return (
        <NodeToolbar position={Position.Top} align={"center"} offset={40}>
            <ToolbarProvider>
                <Toolbar>
                    <ToolbarSection>
                        <IconButton
                            aria-label={"change shape"}
                            icon={<Icon as={CoinsSwap} boxSize={6} />}
                            title={"change Shape"}
                        />

                        <ToolbarSubmenu>
                            <ToolbarSubmenuTrigger
                                aria-label={"change shape"}
                                icon={<Icon as={Square} boxSize={6} />}
                                title={"change Shape"}
                            />
                            <ToolbarSubmenuContent>
                                <ToolbarSection>
                                    <IconButton
                                        aria-label={"person mode"}
                                        icon={<User />}
                                        title={"person mode"}
                                    />
                                    <IconButton
                                        aria-label={"software system mode"}
                                        icon={<Keyframe />}
                                        title={"software system mode"}
                                    />
                                    <IconButton
                                        aria-label={"container mode"}
                                        icon={<KeyframesCouple />}
                                        title={"container mode"}
                                    />
                                    <IconButton
                                        aria-label={"component moe"}
                                        icon={<Keyframes />}
                                        title={"component mode"}
                                    />
                                    <IconButton
                                        aria-label={"group mode"}
                                        icon={<KeyframePlusIn />}
                                        title={"group mode"}
                                    />
                                </ToolbarSection>
                            </ToolbarSubmenuContent>
                        </ToolbarSubmenu>
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"copy element"}
                            icon={<Icon as={Copy} boxSize={6} />}
                            title={"copy element"}
                        />
                        {!isLocked && (
                            <IconButton
                                aria-label={"lock element"}
                                icon={<Icon as={Lock} boxSize={6} />}
                                title={"lock element"}
                                onClick={handleOnClickLockNode}
                            />
                        )}
                        {isLocked && (
                            <IconButton
                                aria-label={"unlock element"}
                                icon={<Icon as={LockSlash} boxSize={6} />}
                                title={"unlock element"}
                                onClick={handleOnClickUnlockNode}
                            />
                        )}
                        <IconButton
                            aria-label={"remove shape"}
                            icon={<Icon as={BinMinusIn} boxSize={6} color={"red.600"} />}
                            title={"remove Shape"}
                        />
                    </ToolbarSection>
                </Toolbar>
            </ToolbarProvider>
        </NodeToolbar>
    )
}