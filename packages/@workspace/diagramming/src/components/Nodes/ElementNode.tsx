import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { Plus, ZoomIn } from "iconoir-react";
import { IElement, ElementStyleProperties, ShapeType } from "@structurizr/dsl";
import { Handle, Position, useStore } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { ElementLabel } from "./ElementLabel";
import { DefaultBox, RoundedBox } from "../Shapes";
import { HexColor } from "../../utils";

const ElementInteractiveHandle: FC<PropsWithChildren<{
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    position: Position;
    isSelected?: boolean;
}>> = ({
    children,
    backgroundColor,
    borderColor,
    borderWidth,
    position,
    isSelected
}) => {
    const handlePosition = {
        [Position.Left]: { top: "calc(50% - 80px)", left: "-100px", right: "auto", bottom: "auto" },
        [Position.Top]: { top: "-100px", left: "calc(50% - 80px)", right: "auto", bottom: "auto" },
        [Position.Right]: { top: "calc(50% - 80px)", left: "auto", right: "-100px", bottom: "auto" },
        [Position.Bottom]: { top: "auto", left: "calc(50% - 80px)", right: "auto", bottom: "-100px" },
    }

    return (
        <Flex
            data-group
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
            visibility={"hidden"}
            aria-selected={isSelected}
            _selected={{ visibility: "visible" }}
            _groupHover={{ visibility: "visible" }}
        >
            <Flex
                position={"relative"}
                aria-label={"add element"}
                backgroundColor={"rgba(255, 255, 255, 0.20)" ?? borderColor}
                borderRadius={2}
                borderColor={"rgba(255, 255, 255, 0.20)" ?? borderColor}
                boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10)"}
                backdropFilter={"blur(32px)"}
                alignItems={"center"}
                justifyContent={"center"}
                height={2}
                width={2}
                // _groupHover={{
                //     backgroundColor: "gray.900",
                //     height: "24px",
                //     width: "24px",
                // }}
                _hover={{
                    backgroundColor: "basic.white",
                    height: "24px",
                    width: "24px",
                }}
            >
                <Icon
                    as={Plus}
                    color={"gray.100"}
                    boxSize={4}
                    visibility={"hidden"}
                    _hover={{ visibility: "visible" }}
                />
                <Handle
                    key={`handle-source-${position}`}
                    id={`handle-source-${position}`}
                    type={"source"}
                    position={position}
                    style={{
                        background: "none",
                        border: "none",
                        inset: "auto",
                        minWidth: "8px",
                        minHeight: "8px",
                        height: "100%",
                        width: "100%",
                        transform: "none",
                    }}
                />
            </Flex>
        </Flex>
    )
}

export function ElementShapeWhapper(ShapeComponent: FC<PropsWithChildren<{
    style: ElementStyleProperties;
    isSelected?: boolean;
}>>): FC<{
    data: IElement;
    style: ElementStyleProperties;
    selected?: boolean;
}> {
    return function ElementNodeComponent({
        data,
        style,
        selected,
    }) {
        const positions = [Position.Left, Position.Top, Position.Right, Position.Bottom];
        const isTarget = useStore(state => state.connectionNodeId && state.connectionNodeId !== data.identifier);

        return (
            <ShapeComponent data-group style={style} isSelected={selected}>
                {positions.map((position) => (
                    <ElementInteractiveHandle
                        key={`handle-arrow-${position}`}
                        position={position}
                        isSelected={selected}
                    />
                ))}
                    <Flex
                        aria-selected={selected}
                        backgroundColor={"gray.900"}
                        borderRadius={8}
                        position={"absolute"}
                        left={-6}
                        top={2}
                        visibility={"hidden"}
                        height={"24px"}
                        width={"48px"}
                        zIndex={-1}
                        _selected={{ visibility: "visible" }}
                        _groupHover={{ visibility: "visible" }}
                    >
                        <IconButton
                            aria-label={"zoom into element"}
                            icon={<Icon as={ZoomIn} boxSize={4} />}
                            color={"gray.100"}
                            size={"xs"}
                            variant={"tonal"}
                            // onClick={onZoomClick}
                        />
                    </Flex>
                {isTarget && (
                    <Handle
                        id={"handle-target"}
                        type={"target"}
                        position={Position.Left}
                        style={{
                            backgroundColor: HexColor.withAlpha(style.background, 0.1),
                            backdropFilter: "blur(16px)",
                            border: "none",
                            borderRadius: "16px",
                            inset: "auto",
                            transform: "none",
                            height: "100%",
                            width: "100%",
                        }}
                    />
                )}
                <ElementLabel data={data} style={style} isSelected={selected} showDescription />
            </ShapeComponent>
        );
    }
}

export const DefaultBoxElement = ElementShapeWhapper(DefaultBox);
export const RoundedBoxElement = ElementShapeWhapper(RoundedBox);

export const ElementNode: FC<{
    data: IElement;
    style: ElementStyleProperties;
    selected?: boolean;
}> = (props) => {
    switch (props.style.shape) {
        case ShapeType.RoundedBox:
            return (<RoundedBoxElement {...props} />);
        case ShapeType.Box:
            return (<DefaultBoxElement {...props} />);
        default:
            return (<DefaultBoxElement {...props} />);
    };
}