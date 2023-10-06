import { IconButton, useDisclosure } from "@chakra-ui/react";
import { Enlarge, Reduce } from "iconoir-react";
import { FC, useCallback } from "react";
import { Toolbar, ToolbarSection } from "../containers";

export const WorkspaceScaleToolbar: FC<{
    size?: "xs" | "sm" | "md" | "lg";
    onEnlargeClick?: () => void;
    onReduceClick?: () => void;
}> = ({
    size = "md",
    onEnlargeClick,
    onReduceClick,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOnEnlargeClick = useCallback(() => {
        onOpen();
        onEnlargeClick?.();
    }, [onOpen, onEnlargeClick]);

    const handleOnReduceClick = useCallback(() => {
        onClose();
        onReduceClick?.();
    }, [onClose, onReduceClick]);

    return (
        <Toolbar size={size}>
            <ToolbarSection size={size}>
                {!isOpen && (
                    <IconButton
                        aria-label={"enlarge"}
                        icon={<Enlarge />}
                        title={"enlarge"}
                        onClick={handleOnEnlargeClick}
                    />
                )}
                {isOpen && (
                    <IconButton
                        aria-label={"reduce"}
                        icon={<Reduce />}
                        title={"reduce"}
                        onClick={handleOnReduceClick}
                    />
                )}
            </ToolbarSection>
        </Toolbar>
    )
}