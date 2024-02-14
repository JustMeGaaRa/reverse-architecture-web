import { Box } from "@chakra-ui/react";
import { DragEventHandler, FC, PropsWithChildren } from "react";

export const ContextSheetOverlay: FC<PropsWithChildren<{
    isOpen?: boolean;
    onDragEnter?: DragEventHandler<HTMLDivElement>;
    onDragOver?: DragEventHandler<HTMLDivElement>;
    onDragLeave?: DragEventHandler<HTMLDivElement>;
    onDrop?: DragEventHandler<HTMLDivElement>;
}>> = ({
    children,
    isOpen,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop
}) => {
    return (
        <Box
            backgroundColor={"surface.tinted-black-60"}
            backdropFilter={"blur(32px)"}
            borderTopLeftRadius={32}
            height={"100%"}
            width={"100%"}
            position={"absolute"}
            left={0}
            top={0}
            zIndex={1000}
            display={isOpen ? "block" : "none"}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            {children}
        </Box>
    )
}