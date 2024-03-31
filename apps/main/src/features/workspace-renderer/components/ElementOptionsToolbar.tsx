import { Icon, IconButton } from "@chakra-ui/react";
import { Position, useReactFlow } from "@reactflow/core";
import { NodeToolbar } from "@reactflow/node-toolbar";
import {
    Toolbar,
    ToolbarSection,
    ToolbarSubmenu,
    ToolbarSubmenuContent,
    ToolbarSubmenuTrigger
} from "@restruct/toolbar";
import { useSelectedNodes, useWorkspace } from "@structurizr/react";
import {
    BinMinusIn,
    Circle,
    CoinsSwap,
    Copy,
    Cylinder,
    Hexagon,
    Keyframe,
    KeyframePlusIn,
    Keyframes,
    KeyframesCouple,
    Lock,
    LockSlash,
    Square,
    User
} from "iconoir-react";
import { FC, useCallback } from "react";

export const ElementOptionsToolbar: FC = () => {
    const { selectedNodes } = useSelectedNodes();
    const { setNodes } = useReactFlow();
    const { workspace } = useWorkspace();

    const handleOnClickLockNode = useCallback(() => {
        setNodes(nodes => nodes.map(node => node.selected ? { ...node, draggable: false } : node));
    }, [setNodes]);

    const handleOnClickUnlockNode = useCallback(() => {
        setNodes(nodes => nodes.map(node => node.selected ? { ...node, draggable: true } : node));
    }, [setNodes]);

    const handleOnRemoveElement = useCallback(() => {
        // deleteElements(selectedNodes.map(x => x.data.element))
    }, []);

    return (
        <NodeToolbar
            align={"center"}
            isVisible={workspace !== null && workspace !== undefined && selectedNodes.length > 0}
            nodeId={selectedNodes.map(x => x.id)}
            offset={40}
            position={Position.Top}
        >
            <Toolbar>
                <ToolbarSection>
                    <ToolbarSubmenu>
                        <ToolbarSubmenuTrigger
                            aria-label={"change shape"}
                            icon={<Icon as={CoinsSwap} boxSize={6} />}
                            title={"change Shape"}
                        />
                        <ToolbarSubmenuContent>
                            <ToolbarSection>
                                <IconButton
                                    aria-label={"person"}
                                    icon={<User />}
                                    title={"person"}
                                />
                                <IconButton
                                    aria-label={"software system"}
                                    icon={<Keyframe />}
                                    title={"software system"}
                                />
                                <IconButton
                                    aria-label={"container"}
                                    icon={<KeyframesCouple />}
                                    title={"container"}
                                />
                                <IconButton
                                    aria-label={"component"}
                                    icon={<Keyframes />}
                                    title={"component"}
                                />
                                <IconButton
                                    aria-label={"group"}
                                    icon={<KeyframePlusIn />}
                                    title={"group"}
                                />
                            </ToolbarSection>
                        </ToolbarSubmenuContent>
                    </ToolbarSubmenu>

                    <ToolbarSubmenu>
                        <ToolbarSubmenuTrigger
                            aria-label={"change shape"}
                            icon={<Icon as={Square} boxSize={6} />}
                            title={"change Shape"}
                        />
                        <ToolbarSubmenuContent>
                            <ToolbarSection>
                                <IconButton
                                    aria-label={"person"}
                                    icon={<User />}
                                    title={"person"}
                                />
                                <IconButton
                                    aria-label={"square"}
                                    icon={<Square />}
                                    title={"square"}
                                />
                                <IconButton
                                    aria-label={"circle"}
                                    icon={<Circle />}
                                    title={"circle"}
                                />
                                <IconButton
                                    aria-label={"hexagon"}
                                    icon={<Hexagon />}
                                    title={"hexagon"}
                                />
                                <IconButton
                                    aria-label={"cylinder"}
                                    icon={<Cylinder />}
                                    title={"cylinder"}
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
                    {selectedNodes.some(x => x.draggable === true || x.draggable === undefined) && (
                        <IconButton
                            aria-label={"lock element"}
                            icon={<Icon as={Lock} boxSize={6} />}
                            title={"lock element"}
                            onClick={handleOnClickLockNode}
                        />
                    )}
                    {selectedNodes.every(x => x.draggable === false) && (
                        <IconButton
                            aria-label={"unlock element"}
                            icon={<Icon as={LockSlash} boxSize={6} />}
                            title={"unlock element"}
                            onClick={handleOnClickUnlockNode}
                        />
                    )}
                    <IconButton
                        aria-label={"remove element"}
                        icon={<Icon as={BinMinusIn} boxSize={6} color={"red.600"} />}
                        title={"remove element"}
                        onClick={handleOnRemoveElement}
                    />
                </ToolbarSection>
            </Toolbar>
        </NodeToolbar>
    )
}