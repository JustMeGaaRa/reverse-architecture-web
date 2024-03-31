import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip } from "@chakra-ui/react";
import { Toolbar, ToolbarSection } from "@restruct/ui";
import { PanelPosition, useZoom, WorkspacePanel } from "@structurizr/react";
import { Minus, Plus } from "iconoir-react";
import { FC, useMemo } from "react";

export const ZoomOptionsMenu: FC = () => {
    const { zoom, fitView, focusCenter, zoomTo } = useZoom();
    const items = useMemo(() => [
        { title: "Fit view", command: "Ctrl, Z + 0", onClick: () => fitView({ padding: 0.2, duration: 500 })},
        { title: "Center View", command: "Ctrl, Z + C", onClick: () => focusCenter()},
        { title: "50%", command: "Ctrl, Z + .", onClick: () => zoomTo(0.5, { duration: 500 }) },
        { title: "100%", command: "Ctrl, Z + 1", onClick: () => zoomTo(1, { duration: 500 }) },
        { title: "200%", command: "Ctrl, Z + 2", onClick: () => zoomTo(2, { duration: 500 }) }
    ], [fitView, focusCenter, zoomTo]);

    return (
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
    )
}

export const WorkspaceZoomControls: FC<{
    position?: PanelPosition;
}> = ({
    position
}) => {
    const { zoomIn, zoomOut } = useZoom();

    return (
        <WorkspacePanel position={position ?? "bottom-right"}>
            <Toolbar>
                <ToolbarSection>
                    <Tooltip label={"Zoom Out"}>
                        <IconButton
                            aria-label={"zoom out"}
                            icon={<Minus height={"24px"} width={"24px"} />}
                            title={"zoom out"}
                            onClick={() => zoomOut()}
                        />
                    </Tooltip>
                    <ZoomOptionsMenu />
                    <Tooltip label={"Zoom In"}>
                        <IconButton
                            aria-label={"zoom in"}
                            title={"zoom in"}
                            icon={<Plus />}
                            onClick={() => zoomIn()}
                        />
                    </Tooltip>
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}