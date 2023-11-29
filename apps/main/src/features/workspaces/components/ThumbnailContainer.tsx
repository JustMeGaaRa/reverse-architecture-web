import { AspectRatio, Box } from "@chakra-ui/react";
import { FC, MouseEventHandler, PropsWithChildren } from "react";

export const ThumbnailContainer: FC<PropsWithChildren<{
    isSelected?: boolean;
    onMouseDown?: MouseEventHandler<HTMLDivElement>;
    onMouseUp?: MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: MouseEventHandler<HTMLDivElement>;
    onClick?: MouseEventHandler<HTMLDivElement>;
}>> = ({
    children,
    isSelected,
    onMouseDown,
    onMouseUp,
    onDoubleClick,
    onClick,
}) => {
    return (
        <AspectRatio ratio={2/1}>
            <Box
                aria-selected={isSelected}
                borderRadius={16}
                boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10)"}
                cursor={"pointer"}
                height={"100%"}
                width={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
                overflow={"hidden"}
                _selected={{
                    borderWidth: 2,
                    borderColor: "lime.600",
                    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10), 0px 0px 0px 5px #161819 inset"
                }}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onDoubleClick={onDoubleClick}
                onClick={onClick}
            >
                {children}
            </Box>
        </AspectRatio>
    )
}