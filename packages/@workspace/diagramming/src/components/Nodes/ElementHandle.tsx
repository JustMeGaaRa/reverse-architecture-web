import { Flex, Icon } from "@chakra-ui/react";
import { Position } from "@reactflow/core";
import { Plus } from "iconoir-react";
import { FC, useCallback, useState } from "react";
import { ReactFlowNodeHandle } from "./ReactFlowNodeHandle";

export const ElementHandle: FC<{
    position: Position;
    isSelected?: boolean;
    isVisibile?: boolean;
}> = ({
    position,
    isSelected,
    isVisibile
}) => {
    const handlePosition = {
        [Position.Left]: { top: "calc(50% - 80px)", left: "-100px", right: "auto", bottom: "auto" },
        [Position.Top]: { top: "-100px", left: "calc(50% - 80px)", right: "auto", bottom: "auto" },
        [Position.Right]: { top: "calc(50% - 80px)", left: "auto", right: "-100px", bottom: "auto" },
        [Position.Bottom]: { top: "auto", left: "calc(50% - 80px)", right: "auto", bottom: "-100px" },
    }
    const [ isHandleVisible, setIsHandleVisible ] = useState(false);

    const handleOnMouseOver = useCallback(() => {
        setIsHandleVisible(true);
    }, []);

    const handleOnMouseLeave = useCallback(() => {
        setIsHandleVisible(false);
    }, []);

    return (
        <Flex
            aria-label={"element handle area"}
            aria-selected={isSelected}
            border={"none"}
            borderRadius={"full"}
            alignItems={"center"}
            justifyContent={"center"}
            left={handlePosition[position].left}
            top={handlePosition[position].top}
            right={handlePosition[position].right}
            bottom={handlePosition[position].bottom}
            height={"160px"}
            width={"160px"}
            position={"absolute"}
            visibility={isSelected || isVisibile ? "visible" : "hidden"}
            zIndex={-1}
            // _selected={{ visibility: "visible" }}
            // _groupHover={{ visibility: "visible" }}
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
        >
            <Flex
                data-group
                position={"relative"}
                aria-label={"element handle button"}
                backgroundColor={isHandleVisible ? "gray.900" : "surface.tinted-white-20"}
                backdropFilter={"blur(32px)"}
                borderRadius={isHandleVisible ? 8 : 2}
                borderColor={"surface.tinted-white-20"}
                boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10)"}
                alignItems={"center"}
                justifyContent={"center"}
                height={isHandleVisible ? "24px" : "8px"}
                width={isHandleVisible ? "24px" : "8px"}
                // _groupHover={{
                //     backgroundColor: "gray.900",
                //     borderRadius: 8,
                //     height: "24px",
                //     width: "24px",
                // }}
                _hover={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    height: "24px",
                    width: "24px",
                }}
            >
                <Icon
                    as={Plus}
                    color={"gray.100"}
                    boxSize={4}
                    visibility={isHandleVisible ? "visible" : "hidden"}
                    // _hover={{ visibility: "visible" }}
                    // _groupHover={{ visibility: "visible" }}
                />
                <ReactFlowNodeHandle
                    position={position}
                    type={"source"}
                />
            </Flex>
        </Flex>
    )
}