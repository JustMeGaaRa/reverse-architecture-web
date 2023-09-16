import { Flex, IconButton } from "@chakra-ui/react";
import { FastArrowLeft, FastArrowRight } from "iconoir-react";
import { FC, PropsWithChildren } from "react";

export const PageSidebarToggleButton: FC<PropsWithChildren<{
    isExpanded: boolean,
    onClick: () => void
}>> = ({
    isExpanded,
    onClick
}) => {
    return (
        <IconButton
            aria-label={"page sidebar toggle"}
            borderRadius={0}
            colorScheme={"gray"}
            icon={isExpanded ? <FastArrowLeft /> : <FastArrowRight />}
            size={"sm"}
            variant={"ghost"}
            width={"100%"}
            onClick={onClick}
        />
    )
}