import { Button, ButtonGroup, HStack, useColorModeValue } from "@chakra-ui/react";
import { Panel, useReactFlow, useStore } from "@reactflow/core";
import { HelpCircle, Minus, Plus } from "iconoir-react";
import { FC } from "react";
import { OnlineUsers, ToolbarIconButton } from "..";
import { useOnlineUsers } from "../c4-view-renderer/hooks/useOnlineUsers";
import { ControlPanel } from "./Panel";

export type ActivityPanelProps = {
    showZoom?: boolean;
    showFitView?: boolean;
};

export const ActivityPanel: FC<ActivityPanelProps> = ({
    showZoom = true,
    showFitView = true,
}) => {
    const zoomSelector = (state) => {
        return (state.transform[2] * 100);
    };
    const zoom = useStore(zoomSelector);
    const { zoomIn, zoomOut, fitView } = useReactFlow();
    
    const { users } = useOnlineUsers();

    const backgroundColor = useColorModeValue("gray.100", "#3F4614");
    const color = useColorModeValue("gray.800", "#E5FF00");
    const activeColor = useColorModeValue("gray.800", "#E5FF00");

    return (
        <Panel position={"top-right"}>
            <HStack>
                
                <ControlPanel>
                    <HStack px={2}>
                        <OnlineUsers users={users} />
                    </HStack>
                </ControlPanel>
                
                <ControlPanel>
                    <ButtonGroup
                        gap={0}
                        spacing={0}
                        orientation={"horizontal"}
                        size={"md"}
                    >
                        {showZoom && (
                            <ToolbarIconButton
                                aria-label={"zoom out"}
                                title={"zoom out"}
                                icon={<Minus />}
                                onClick={() => zoomOut()}
                            />
                        )}
                        {showFitView && (
                            <Button
                                aria-label={"fit view"}
                                title={"fit view"}
                                variant={"ghost"}
                                _hover={{
                                    backgroundColor: backgroundColor,
                                    color: color,
                                }}
                                _active={{
                                    color: activeColor,
                                }}
                                onClick={() => fitView({ padding: 0.2, duration: 500 })}
                            >
                                {`${zoom.toFixed(0)}%`}
                            </Button>
                        )}
                        {showZoom && (
                            <ToolbarIconButton
                                aria-label={"zoom in"}
                                title={"zoom in"}
                                icon={<Plus />}
                                onClick={() => zoomIn()}
                            />
                        )}
                    </ButtonGroup>
                </ControlPanel>

                <ControlPanel>
                    <ToolbarIconButton
                        aria-label={"Help"}
                        title={"Help"}
                        icon={<HelpCircle />}
                    />
                </ControlPanel>

            </HStack>
        </Panel>
    );
}