import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { useZoom } from "../hooks";

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