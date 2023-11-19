import { Box, HStack, StackDivider } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Toolbar: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            // white 10% and 0.1%
            background={"linear-gradient(rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.001))"}
            borderRadius={20}
        >
            <HStack
                alignItems={"center"}
                divider={
                    <StackDivider
                        borderColor={"gray.400"}
                        height={"24px"}
                        alignSelf={"center"}
                    />
                }
                justifyContent={"center"}
                // white 5%
                backgroundColor={"rgba(255, 255, 255, 0.05)"}
                backdropFilter={"blur(32px)"}
                borderWidth={"2px"}
                borderColor={"transparent"}
                boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10), 12px 12px 16px 0px rgba(0, 0, 0, 0.20) inset, -12px -12px 16px 0px rgba(255, 255, 255, 0.05) inset"}
                gap={0}
                borderRadius={20}
                padding={"2px"}
            >
                {children}
            </HStack>
        </Box>
    );
}