import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from "@chakra-ui/react";
import { useReactFlow, useStore, getRectOfNodes } from "@reactflow/core";
import { Minus, Plus } from "iconoir-react";
import { FC, useCallback, useMemo } from "react";
import {
    ToolbarSection,
    Toolbar
} from "../components";

export const WorkspaceZoomControls: FC = () => {
    const zoom = useStore((state) => (state.transform[2] * 100));
    const { getNodes, zoomTo, zoomIn, zoomOut, fitView, setCenter } = useReactFlow();

    const focusCenter = useCallback(() => {
        const rect = getRectOfNodes(getNodes());
        const x = rect.x + rect.width / 2;
        const y = rect.y + rect.height / 2;
        setCenter(x, y, { zoom: 1, duration: 500 });
    }, [getNodes, setCenter])

    const items = useMemo(() => [
        { title: "Fit view", command: "Ctrl, Z + 0", onClick: () => fitView({ padding: 0.2, duration: 500 })},
        { title: "Center View", command: "Ctrl, Z + C", onClick: () => focusCenter()},
        { title: "50%", command: "Ctrl, Z + .", onClick: () => zoomTo(0.5, { duration: 500 }) },
        { title: "100%", command: "Ctrl, Z + 1", onClick: () => zoomTo(1, { duration: 500 }) },
        { title: "200%", command: "Ctrl, Z + 2", onClick: () => zoomTo(2, { duration: 500 }) }
    ], [fitView, focusCenter, zoomTo]);

    return (
        <Box position={"absolute"} bottom={4} right={4}>
            <Toolbar>
                <ToolbarSection>
                    <IconButton
                        aria-label={"zoom out"}
                        title={"zoom out"}
                        icon={<Minus />}
                        onClick={() => zoomOut()}
                    />
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
                    <IconButton
                        aria-label={"zoom in"}
                        title={"zoom in"}
                        icon={<Plus />}
                        onClick={() => zoomIn()}
                    />
                </ToolbarSection>
            </Toolbar>
        </Box>
    )
}