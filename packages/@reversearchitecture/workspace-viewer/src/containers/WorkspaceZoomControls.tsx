import {
    Button,
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
import { Minus, Plus } from "iconoir-react";
import { FC, useMemo } from "react";
import {
    ToolbalSection,
    Toolbar
} from "../components";

export const WorkspaceZoomControls: FC<{
    
}> = ({
    
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
        <Panel position={"bottom-right"}>
            <Toolbar>
                <ToolbalSection>
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
                </ToolbalSection>
            </Toolbar>
        </Panel>
    )
}