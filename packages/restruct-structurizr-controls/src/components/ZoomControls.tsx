import { Button, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Tooltip } from "@chakra-ui/react";
import { Plus, Minus } from "@restruct/icons";
import { Toolbar, ToolbarSection } from "@restruct/toolbar";
import { useViewport } from "@structurizr/react";
import { FC, useCallback, useMemo } from "react";

export const ZoomToolbar: FC = () => {
    const { zoom, setZoom, getBounds, fitBounds, centerViewbox } = useViewport();
    
    const percentageZoomItems = useMemo(() => [
        { title: "25%", command: "Ctrl, Z + 6", onClick: () => setZoom(0.25) },
        { title: "50%", command: "Ctrl, Z + 5", onClick: () => setZoom(0.5) },
        { title: "100%", command: "Ctrl, Z + 1", onClick: () => setZoom(1) },
        { title: "200%", command: "Ctrl, Z + 2", onClick: () => setZoom(2) },
        { title: "400%", command: "Ctrl, Z + 4", onClick: () => setZoom(4) }
    ], [setZoom]);
    const fitZoomItems = useMemo(() => [
        { title: "Fit View", command: "Ctrl, Z + F", onClick: () => fitBounds(getBounds()) },
        { title: "Center View", command: "Ctrl, Z + C", onClick: () => centerViewbox(getBounds()) },
    ], [centerViewbox, fitBounds, getBounds]);

    const handleZoomMinus = useCallback(() => {
        const zoomIntensity = 0.1;
        const deltaScale = Math.pow(1 + zoomIntensity, 2);
        setZoom((scale) => scale / deltaScale);
    }, [setZoom]);

    const handleZoomPlus = useCallback(() => {
        const zoomIntensity = -0.1;
        const deltaScale = Math.pow(1 + zoomIntensity, 2);
        setZoom((scale) => scale / deltaScale);
    }, [setZoom]);

    return (
        <Toolbar>
            <ToolbarSection size={"sm"}>
                <Tooltip label={"Zoom Out"} openDelay={500}>
                    <IconButton
                        aria-label={"zoom out"}
                        icon={<Minus />}
                        title={"zoom out"}
                        onClick={handleZoomMinus}
                    />
                </Tooltip>
                <Menu>
                    <MenuButton as={Button}>
                        {`${(zoom * 100).toFixed(0)}%`}
                    </MenuButton>
                    <MenuList>
                        {percentageZoomItems.map(item => (
                            <MenuItem
                                key={item.title}
                                command={item.command}
                                onClick={item.onClick}
                            >
                                {item.title}
                            </MenuItem>
                        ))}
                        <MenuDivider />
                        {fitZoomItems.map(item => (
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
                <Tooltip label={"Zoom In"} openDelay={500}>
                    <IconButton
                        aria-label={"zoom in"}
                        title={"zoom in"}
                        icon={<Plus />}
                        onClick={handleZoomPlus}
                    />
                </Tooltip>
            </ToolbarSection>
        </Toolbar>
    );
};
