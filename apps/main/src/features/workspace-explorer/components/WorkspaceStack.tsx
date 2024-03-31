import { ScaleFade } from "@chakra-ui/react";
import {
    Shell,
    ShellBody,
    ShellCloseButton,
    ShellHeader,
    ShellTitle
} from "@restruct/ui";
import {
    createContext,
    FC,
    PropsWithChildren,
    useContext
} from "react";

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
            <Shell isOpen={isOpen} gap={2} padding={2}>
                {children}
            </Shell>
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
            <ShellHeader
                backgroundColor={"surface.tinted-white-10"}
                outlineRadius={[24, 24, 24, 24]}
                padding={2}
            >
                <ShellTitle icon={icon} title={title} />
                <ShellCloseButton size={"lg"} onClick={onClose} />
            </ShellHeader>
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
            <ShellBody
                backgroundColor={"surface.tinted-white-5"}
                outlineRadius={[24, 24, 24, 24]}
                padding={4}
            >
                {children}
            </ShellBody>
        </ScaleFade>
    )
}