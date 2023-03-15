import { Settings } from "iconoir-react";
import { FC } from "react";
import { ToolbarIconButton } from "./ToolbarIconButton";

type SettingsMenuProps = unknown;

export const SettingsMenu: FC<SettingsMenuProps> = () => {
    return (
        <ToolbarIconButton
            aria-label={"settings"}
            title={"settings"}
            icon={<Settings />}
        />
    )
}