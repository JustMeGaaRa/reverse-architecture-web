import { Box, Flex, Icon } from "@chakra-ui/react";
import { Handle, Position } from "@reactflow/core";
import { Plus } from "iconoir-react";
import { FC, PropsWithChildren, useCallback, useState } from "react";

export const ElementHandleArea: FC<PropsWithChildren<{
    position: Position;
    onMouseOver?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    position,
    onMouseOver,
    onMouseLeave
}) => {
    const handlePosition = {
        [Position.Left]: { top: "calc(50% - 80px)", left: "-100px", right: "auto", bottom: "auto" },
        [Position.Top]: { top: "-100px", left: "calc(50% - 80px)", right: "auto", bottom: "auto" },
        [Position.Right]: { top: "calc(50% - 80px)", left: "auto", right: "-100px", bottom: "auto" },
        [Position.Bottom]: { top: "auto", left: "calc(50% - 80px)", right: "auto", bottom: "-100px" },
    }

    return (
        <Box
            data-group
            aria-label={"element handle position"}
            position={"absolute"}
            left={handlePosition[position].left}
            top={handlePosition[position].top}
            right={handlePosition[position].right}
            bottom={handlePosition[position].bottom}
            zIndex={-1}
        >
            <Flex
                aria-label={"element handle area"}
                border={"none"}
                borderRadius={"full"}
                alignItems={"center"}
                justifyContent={"center"}
                height={"160px"}
                width={"160px"}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            >
                {children}
            </Flex>
        </Box>
    )
}

export const ElementHandle: FC<PropsWithChildren<{
    position: Position;
    isHovered?: boolean;
    isSelected?: boolean;
    isExapanded?: boolean;
    onClick?: () => void;
}>> = ({
    children,
    position,
    isHovered,
    isSelected,
    isExapanded,
    onClick,
}) => {
    const handlesTransform = {
        [Position.Left]: "translate(-150%, -50%)",
        [Position.Right]: "translate(50%, -50%)",
        [Position.Top]: "translate(-50%, -150%)" ,
        [Position.Bottom]: "translate(-50%, 50%)" ,
    }
    const [ isChildrenVisible, setIsChildrenVisible ] = useState(false);

    const handleOnMouseEnterHandle = useCallback(() => {
        setIsChildrenVisible(true);
    }, []);

    const handleOnMouseLeaveHandle = useCallback(() => {
        setIsChildrenVisible(false);
    }, []);

    return (
        <Flex
            aria-label={"element handle button"}
            backgroundColor={isExapanded ? "gray.900" : "surface.tinted-white-20"}
            backdropFilter={"blur(32px)"}
            borderRadius={isExapanded ? 8 : 2}
            boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10)"}
            alignItems={"center"}
            justifyContent={"center"}
            height={isExapanded ? "24px" : "8px"}
            width={isExapanded ? "24px" : "8px"}
            transitionProperty={"all"}
            transitionDuration={"0.2s"}
            transitionTimingFunction={"ease-in-out"}
            visibility={isExapanded || isHovered || isSelected ? "visible" : "hidden"}
            zIndex={1000}
            _hover={{
                backgroundColor: "white",
                borderRadius: 8,
                height: "24px",
                width: "24px",
            }}
            onMouseEnter={handleOnMouseEnterHandle}
            onMouseLeave={handleOnMouseLeaveHandle}
            onClick={onClick}
        >
            <Handle
                id={"handle-target"}
                position={position}
                type={"source"}
                style={{
                    background: "none",
                    border: "none",
                    inset: "auto",
                    transform: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                <Icon
                    as={Plus}
                    color={"gray.100"}
                    boxSize={4}
                    transitionDelay={isExapanded ? "0.2s" : "unset"}
                    visibility={isExapanded ? "visible" : "hidden"}
                />
                <Box
                    position={"absolute"}
                    left={"50%"}
                    top={"50%"}
                    transform={handlesTransform[position]}
                    visibility={isChildrenVisible ? "visible" : "hidden"}
                >
                    {children}
                </Box>
            </Handle>
        </Flex>
    )
}

export const ElementFlowHandle: FC<PropsWithChildren<{
    position: Position;
    isHovered?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
}>> = ({
    children,
    position,
    isHovered,
    isSelected,
    onClick,
}) => {
    const [ isExapanded, setIsExpanded ] = useState(false);

    const handleOnMouseOverFlowArea = useCallback(() => {
        setIsExpanded(true);
    }, []);

    const handleOnMouseLeaveFlowArea = useCallback(() => {
        setIsExpanded(false);
    }, []);

    return (
        <ElementHandleArea
            position={position}
            onMouseOver={handleOnMouseOverFlowArea}
            onMouseLeave={handleOnMouseLeaveFlowArea}
        >
            <ElementHandle
                position={position}
                isHovered={isHovered}
                isSelected={isSelected}
                isExapanded={isExapanded}
                onClick={onClick}
            >
                {children}
            </ElementHandle>
        </ElementHandleArea>
    )
}

export const ElementFlowShortcut: FC<{
    shortcutKeys: string;
}> = ({
    shortcutKeys,
}) => {
    return (
        <Box
            borderColor={"gray.400"}
            borderRadius={8}
            borderWidth={1}
            paddingX={2}
        >
            {shortcutKeys}
        </Box>
    )
}