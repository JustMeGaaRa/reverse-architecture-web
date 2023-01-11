import { FC } from "react";
import { Text } from "@chakra-ui/react";

export const Lorem: FC<{ noOfLines: number }> = ({ noOfLines }) => {
    return (
        <Text
            noOfLines={noOfLines}
        >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...
        </Text>
    );
}
