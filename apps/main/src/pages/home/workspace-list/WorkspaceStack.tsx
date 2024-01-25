import { Box, Flex, ScaleFade } from "@chakra-ui/react";
import { ContextSheetCloseButton, ContextSheetTitle } from "@reversearchitecture/ui";
import { FC, PropsWithChildren } from "react";

export const WorkspaceStack: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            direction={"column"}
            gap={2}
            padding={2}
            height={"100%"}
        >
            {children}
        </Flex>
    )
}

export const WorkspaceStackHeader: FC<{
    title: string;
    icon?: any;
    isOpen: boolean;
    onClose: () => void;
}> = ({
    title,
    icon,
    isOpen,
    onClose
}) => {
    return (
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
                <ContextSheetTitle icon={icon} title={title} />
                <ContextSheetCloseButton size={"lg"} onClick={onClose} />
            </Flex>
        </ScaleFade>
    )
}

export const WorkspaceStackBody: FC<PropsWithChildren<{
    isOpen: boolean;
}>> = ({
    children,
    isOpen
}) => {
    return (
        <ScaleFade
            in={isOpen}
            style={{ height: "100%" }}
            transition={{ enter: { delay: 0.3 } }}
        >
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
    )
}