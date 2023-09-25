import { Flex, IconButton } from "@chakra-ui/react";
import { Cancel } from "iconoir-react";
import { FC } from "react";

export const ContextSheetCloseButton: FC = () => {
    return (
        <Flex
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
            position={"absolute"}
            padding={2}
            right={0}
            top={0}
        >
            <IconButton
                aria-label={"close context sheet"}
                colorScheme={"gray"}
                icon={<Cancel />}
                title={"close context sheet"}
                variant={"ghost"}
                onClick={() => { }}
            />
        </Flex>
    )
}