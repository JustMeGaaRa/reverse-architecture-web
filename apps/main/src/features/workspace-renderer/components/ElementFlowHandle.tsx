import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { Position } from "@reactflow/core";
import { Plus } from "iconoir-react";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { throttle } from "lodash";
import { BoundingBox, useMouseMove } from "@structurizr/react";

export const ElementFlowHandle: FC<{
    position: Position;
    referenceBox: BoundingBox;
    interactiveArea?: number;
    isExpanded?: boolean;
    isVisible?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
}> = ({
    position,
    referenceBox,
    interactiveArea,
    isExpanded,
    isVisible,
    onMouseEnter,
    onMouseLeave,
    onClick,
}) => {
    const offset = 20;
    const handlePosition = useMemo(() => ({
        [Position.Left]: { top: `${referenceBox.height / 2}px`, left: `-${offset}px` },
        [Position.Right]: { top: `${referenceBox.height / 2}px`, left: `${referenceBox.width + offset}px` },
        [Position.Top]: { top: `-${offset}px`, left: `${referenceBox.width / 2}px` },
        [Position.Bottom]: { top: `${referenceBox.height + offset}px`, left: `${referenceBox.width / 2}px` },
    }), [referenceBox]);
    const handleRef = useRef<HTMLDivElement>(null);
    const [ isHovered, setIsHovered ] = useState(false);

    const handleMouseMove = useCallback(throttle((event: MouseEvent) => {
        const handleRect = handleRef.current?.getBoundingClientRect();
        const mousePosition = { x: event.clientX, y: event.clientY };
        const isExapanded = mousePosition?.x >= handleRect?.left - interactiveArea
            && mousePosition?.x <= handleRect?.right + interactiveArea
            && mousePosition?.y >= handleRect?.top - interactiveArea
            && mousePosition?.y <= handleRect?.bottom + interactiveArea;
        setIsHovered(isExapanded);
    }, 100), []);

    useMouseMove(document.querySelector(".react-flow__pane"), handleMouseMove);

    return isVisible && (
        <Box
            ref={handleRef}
            alignItems={"center"}
            justifyContent={"center"}
            left={handlePosition[position].left}
            top={handlePosition[position].top}
            position={"absolute"}
            pointerEvents={"all"}
            transform={"translate(-50%, -50%)"}
        >
            <Flex
                aria-label={"element handle button"}
                backgroundColor={isExpanded || isHovered ? "gray.900" : "surface.tinted-white-20"}
                backdropFilter={"blur(32px)"}
                borderRadius={isExpanded || isHovered ? 8 : 2}
                boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10)"}
                alignItems={"center"}
                justifyContent={"center"}
                height={isExpanded || isHovered ? "24px" : "8px"}
                width={isExpanded || isHovered ? "24px" : "8px"}
                transitionProperty={"all"}
                transitionDuration={"0.1s"}
                visibility={isExpanded || isHovered || isVisible ? "visible" : "hidden"}
                _hover={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    height: "24px",
                    width: "24px",
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >
                <IconButton
                    aria-label={"add element"}
                    icon={<Icon as={Plus} boxSize={4} />}
                    color={"gray.100"}
                    size={"xs"}
                    transitionDelay={isExpanded || isHovered ? "0.1s" : "unset"}
                    variant={"tonal"}
                    visibility={isExpanded || isHovered ? "visible" : "hidden"}
                />
            </Flex>
        </Box>
    )
}