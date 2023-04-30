import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

export const Logo: FC<{

}> = ({
}) => {
    return (
        <Flex>
            <Text
                fontSize={"32px"}
                fontFamily={"Inter"}
                color={"yellow.primary"}
            >
                RVRS.IO
            </Text>
        </Flex>
    )
}