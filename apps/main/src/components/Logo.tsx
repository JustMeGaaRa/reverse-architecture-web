import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

export const Logo: FC<{

}> = ({
}) => {
    return (
        <Flex>
            <Text
                fontSize={"32px"}
            >
                RVRS.IO
            </Text>
        </Flex>
    )
}