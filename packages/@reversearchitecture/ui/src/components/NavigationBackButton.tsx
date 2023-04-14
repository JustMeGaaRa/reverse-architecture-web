import { Flex, IconButton } from "@chakra-ui/react";
import { ArrowLeft } from "iconoir-react";
import { FC } from "react";

export const NavigationBackButton: FC<{
    onClick?: () => void
}> = ({
    onClick
}) => {
    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
        >
            <IconButton
                aria-label={"navigation back button"}
                colorScheme={"gray"}
                icon={<ArrowLeft />}
                size={"lg"}
                variant={"ghost"}
                onClick={onClick}
            />
        </Flex>
    )
}