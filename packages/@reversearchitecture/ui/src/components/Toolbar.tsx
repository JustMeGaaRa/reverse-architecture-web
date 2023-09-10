import { HStack, StackDivider } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Toolbar: FC<PropsWithChildren> = ({ children }) => {
    return (
        <HStack
            alignItems={"center"}
            divider={<StackDivider borderColor={"whiteAlpha.300"} />}
            justifyContent={"center"}
            backgroundColor={"whiteAlpha.100"}
            backdropFilter={"blur(16px)"}
            borderColor={"whiteAlpha.200"}
            borderWidth={1}
            borderRadius={16}
            height={12}
            px={1}
        >
            {children}
        </HStack>
    );
}