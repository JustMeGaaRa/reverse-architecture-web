import { IconButton, useDisclosure } from "@chakra-ui/react";
import { Toolbar, ToolbarSection } from "@workspace/toolbar";
import { Enlarge, Reduce } from "iconoir-react";
import { FC, useCallback } from "react";

export const WorkspaceScaleToolbar: FC<{
    onEnlargeClick?: () => void;
    onReduceClick?: () => void;
}> = ({
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
        <Toolbar>
            <ToolbarSection>
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