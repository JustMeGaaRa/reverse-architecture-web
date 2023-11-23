import { AspectRatio, Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ThumbnailContainer: FC<PropsWithChildren<{
    isSelected?: boolean;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onClick?: () => void;
}>> = ({
    children,
    isSelected,
    onMouseDown,
    onMouseUp,
    onClick
}) => {
    return (
        <AspectRatio ratio={2/1}>
            <Box
                data-group
                aria-selected={isSelected}
                borderRadius={16}
                boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10)"}
                height={"100%"}
                width={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
                overflow={"hidden"}
                _selected={{
                    borderWidth: 2,
                    borderColor: "lime.600",
                    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10), 0px 0px 0px 5px #161819 inset"
                //     _hover: {
                //         background: `rgba(0, 0, 0, 0.20), url(${workspace.coverUrl})`
                //     },
                //     _groupHover: {
                //         background: `rgba(0, 0, 0, 0.20), url(${workspace.coverUrl})`
                //     },
                //     _active: {
                //         background: `rgba(0, 0, 0, 0.60), url(${workspace.coverUrl})`
                //     },
                //     _groupActive: {
                //         background: `rgba(0, 0, 0, 0.60), url(${workspace.coverUrl})`
                //     }
                }}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onClick={onClick}
            >
                {children}
            </Box>
        </AspectRatio>
    )
}