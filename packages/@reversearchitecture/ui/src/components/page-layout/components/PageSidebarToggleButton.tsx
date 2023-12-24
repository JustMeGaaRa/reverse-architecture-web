import { Button, IconButton } from "@chakra-ui/react";
import { DoubleArrowLeft, DoubleArrowRight } from "@reversearchitecture/icons";
import { FC } from "react";
import { usePageSidebar } from "../hooks";

export const PageSidebarToggleButton: FC<{ isVisible?: boolean }> = ({ isVisible = true }) => {
    const { sidebarOptions, toggleSidebar } = usePageSidebar();
    
    return isVisible ? (sidebarOptions.isOpen ? (
        <Button
            aria-label={"page sidebar toggle"}
            borderRadius={0}
            colorScheme={"gray"}
            justifyContent={"right"}
            paddingRight={2}
            rightIcon={<DoubleArrowLeft />}
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
            icon={<DoubleArrowRight />}
            size={"sm"}
            variant={"ghost"}
            width={"100%"}
            onClick={() => toggleSidebar()}
        />
    )) : (
        <></>
    )
}