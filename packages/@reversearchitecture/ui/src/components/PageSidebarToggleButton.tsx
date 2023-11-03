import { Button, IconButton } from "@chakra-ui/react";
import { FastArrowLeft, FastArrowRight } from "iconoir-react";
import { FC } from "react";
import { usePageSidebar } from "../hooks";

export const PageSidebarToggleButton: FC<{
    isVisible?: boolean;
}> = ({
    isVisible = true
}) => {
    const { sidebarOptions, toggleSidebar } = usePageSidebar();
    
    return isVisible ? (sidebarOptions.isOpen ? (
        <Button
            aria-label={"page sidebar toggle"}
            borderRadius={0}
            colorScheme={"gray"}
            justifyContent={"right"}
            paddingRight={2}
            rightIcon={<FastArrowLeft />}
            size={"sm"}
            variant={"ghost"}
            width={"100%"}
            onClick={() => toggleSidebar()}
        />
    ) : (
        <IconButton
            aria-label={"page sidebar toggle"}
            borderRadius={0}
            colorScheme={"gray"}
            icon={<FastArrowRight />}
            size={"sm"}
            variant={"ghost"}
            width={"100%"}
            onClick={() => toggleSidebar()}
        />
    )) : (
        <></>
    )
}