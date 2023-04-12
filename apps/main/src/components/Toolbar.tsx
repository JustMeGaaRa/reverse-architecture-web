import { Flex, HStack, StackDivider } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Toolbar: FC<PropsWithChildren<{
    
}>> = (props) => {
    return (
        <Flex
            alignItems={"center"}
            justifyContent={"center"}
            background={"gray.100"}
            borderColor={"gray.200"}
            borderWidth={1}
            borderRadius={16}
            height={12}
            px={1}
        >
            <HStack
                divider={<StackDivider />}
            >
                {props.children}
            </HStack>
        </Flex>
    );
}