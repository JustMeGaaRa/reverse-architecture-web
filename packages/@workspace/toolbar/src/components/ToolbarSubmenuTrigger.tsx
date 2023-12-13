import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { useToolbarSubmenu } from "../hooks";

export const ToolbarSubmenuTrigger: FC<IconButtonProps> = (props) => {
    const { isOpen, onToggle } = useToolbarSubmenu();

    const handleOnClickSubmenuTrigger = useCallback((event) => {
        onToggle();
        props?.onClick?.(event);
    }, [onToggle, props]);

    return (
        <IconButton
            {...props}
            aria-selected={isOpen}
            onClick={handleOnClickSubmenuTrigger}
        />
    )
}