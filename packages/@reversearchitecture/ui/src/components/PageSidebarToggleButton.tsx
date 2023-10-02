import { Button, IconButton } from "@chakra-ui/react";
import { FastArrowLeft, FastArrowRight } from "iconoir-react";
import { FC, PropsWithChildren } from "react";

export const PageSidebarToggleButton: FC<PropsWithChildren<{
    isExpanded: boolean,
    onClick: () => void
}>> = ({
    isExpanded,
    onClick
}) => {
    return isExpanded ? (
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
            onClick={onClick}
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
            onClick={onClick}
        />
    )
}