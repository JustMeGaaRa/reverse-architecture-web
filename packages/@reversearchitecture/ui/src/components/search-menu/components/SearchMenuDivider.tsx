import { Divider, Flex } from "@chakra-ui/react";
import { FC } from "react";

export const SearchMenuDivider: FC = () => {
    return (
        <Flex
            justifyContent={"space-between"}
            paddingX={"10px"}
            paddingY={"8px"}
            width={"100%"}
        >
            <Divider
                borderColor={"surface.tinted-white-20"}
                borderBottomWidth={1}
            />
        </Flex>
    );
}