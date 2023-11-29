import { Box, Flex, ScaleFade } from "@chakra-ui/react";
import { ContextSheetCloseButton, ContextSheetTitle } from "@reversearchitecture/ui";
import { AppleShortcuts } from "iconoir-react";
import { FC, PropsWithChildren } from "react";

export const WorkspaceStack: FC<PropsWithChildren<{
    name: string;
    isOpen: boolean;
    onClose: () => void;
}>> = ({
    children,
    name,
    isOpen,
    onClose,
}) => {
    return (
        <Flex
            direction={"column"}
            gap={2}
            padding={2}
            height={"100%"}
        >
            <ScaleFade in={isOpen}>
                <Flex
                    background={"surface.tinted-white-10"}
                    borderRadius={24}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={2}
                    padding={4}
                    paddingRight={2}
                    height={16}
                    width={"100%"}
                >
                    <ContextSheetTitle icon={AppleShortcuts} title={name} />
                    <ContextSheetCloseButton size={"lg"} onClick={onClose} />
                </Flex>
            </ScaleFade>
            <ScaleFade in={isOpen} transition={{ enter: { delay: 0.3 } }}>
                <Box
                    background={"surface.tinted-white-5"}
                    borderRadius={24}
                    padding={4}
                    height={"100%"}
                    width={"100%"}
                >
                    {children}
                </Box>
            </ScaleFade>
        </Flex>
    )
}