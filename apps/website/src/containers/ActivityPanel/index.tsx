import {
    Button,
    ButtonGroup,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from "@chakra-ui/react";
import {
    Panel,
    useReactFlow,
    useStore
} from "@reactflow/core";
import { HelpCircle, Minus, Plus } from "iconoir-react";
import { FC, useMemo } from "react";
import { ControlPanel } from "../../components";
import { UsersOnline } from "..";

export type ZoomPanelProps = {
    showZoom?: boolean;
    showFitView?: boolean;
}

export const ZoomPanel: FC<ActivityPanelProps> = ({
    showZoom = true,
    showFitView = true,
}) => {
    const zoom = useStore((state) => (state.transform[2] * 100));
    const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();

    const items = useMemo(() => [
        { title: "Fit view", command: "Ctrl + 0", onClick: () => fitView({ padding: 0.2, duration: 500 })},
        { title: "50%", command: "Ctrl + .", onClick: () => zoomTo(0.5, { duration: 500 }) },
        { title: "100%", command: "Ctrl + 1", onClick: () => zoomTo(1, { duration: 500 }) },
        { title: "200%", command: "Ctrl + 2", onClick: () => zoomTo(2, { duration: 500 }) }
    ], [zoomTo, fitView]);

    return (
        <ButtonGroup
            gap={0}
            spacing={0}
            orientation={"horizontal"}
            size={"md"}
        >
            {showZoom && (
                <IconButton
                    aria-label={"zoom out"}
                    title={"zoom out"}
                    icon={<Minus />}
                    onClick={() => zoomOut()}
                />
            )}
            {showFitView && (
                <Menu>
                    <MenuButton as={Button}>
                        {`${zoom.toFixed(0)}%`}
                    </MenuButton>
                    <MenuList>
                        {items.map(item => (
                            <MenuItem
                                key={item.title}
                                command={item.command}
                                onClick={item.onClick}
                            >
                                {item.title}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            )}
            {showZoom && (
                <IconButton
                    aria-label={"zoom in"}
                    title={"zoom in"}
                    icon={<Plus />}
                    onClick={() => zoomIn()}
                />
            )}
        </ButtonGroup>
    )
};

export type ActivityPanelProps = ZoomPanelProps & {
};

export const ActivityPanel: FC<ActivityPanelProps> = ({
    showZoom,
    showFitView,
}) => {
    return (
        <Panel position={"top-right"}>
            <HStack>
                
                <ControlPanel>
                    <UsersOnline />
                </ControlPanel>
                
                <ControlPanel>
                    <ZoomPanel
                        showZoom={showZoom}
                        showFitView={showFitView}
                    />
                </ControlPanel>

                <ControlPanel>
                    <IconButton
                        aria-label={"Help"}
                        title={"Help"}
                        icon={<HelpCircle />}
                    />
                </ControlPanel>

            </HStack>
        </Panel>
    );
}