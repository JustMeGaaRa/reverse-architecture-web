import { Box, Flex, ScaleFade } from "@chakra-ui/react";
import { ContextSheet, ContextSheetBody, ContextSheetCloseButton, ContextSheetHeader, ContextSheetTitle } from "@reversearchitecture/ui";
import { createContext, FC, PropsWithChildren, useContext } from "react";

export const WorkspaceStackContext = createContext<{
    isOpen: boolean;
    onClose: () => void;
}>({
    isOpen: false,
    onClose: () => {}
});

export const useWorkspaceStack = () => {
    return useContext(WorkspaceStackContext);
}

export const WorkspaceStack: FC<PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;
}>> = ({
    children,
    isOpen,
    onClose
}) => {
    return (
        <WorkspaceStackContext.Provider value={{ isOpen, onClose }}>
            <ContextSheet isOpen={isOpen} gap={2} padding={2}>
                {children}
            </ContextSheet>
        </WorkspaceStackContext.Provider>
    )
}

export const WorkspaceStackHeader: FC<{
    title: string;
    icon?: any;
}> = ({
    title,
    icon
}) => {
    const { isOpen, onClose } = useWorkspaceStack();

    return (
        <ScaleFade in={isOpen}>
            <ContextSheetHeader
                backgroundColor={"surface.tinted-white-10"}
                justifyContent={"space-between"}
            >
                <ContextSheetTitle icon={icon} title={title} />
                <ContextSheetCloseButton size={"lg"} onClick={onClose} />
            </ContextSheetHeader>
        </ScaleFade>
    )
}

export const WorkspaceStackBody: FC<PropsWithChildren> = ({ children }) => {
    const { isOpen } = useWorkspaceStack();

    return (
        <ScaleFade
            in={isOpen}
            style={{ height: "100%" }}
            transition={{ enter: { delay: 0.3 } }}
        >
            <ContextSheetBody
                backgroundColor={"surface.tinted-white-5"}
                padding={4}
            >
                {children}
            </ContextSheetBody>
        </ScaleFade>
    )
}