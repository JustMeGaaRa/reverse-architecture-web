import { Flex, Box, Icon, } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronUpIcon, ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { IElement, ElementStyleProperties, ShapeType } from "@structurizr/dsl";
import { Handle, Position } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { ElementLabel } from "./ElementLabel";
import { DefaultBox, RoundedBox } from "../Shapes";
import { HexColor } from "../../utils";

const ElementInteractiveHandle: FC<{
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    position: Position;
    visibility: "hidden" | "visible";
}> = ({
    backgroundColor,
    borderColor,
    borderWidth,
    position,
    visibility
}) => {
    const handlePosition = {
        [Position.Left]: { top: "calc(50% - 80px)", left: "-100px", right: "auto", bottom: "auto" },
        [Position.Top]: { top: "-100px", left: "calc(50% - 80px)", right: "auto", bottom: "auto" },
        [Position.Right]: { top: "calc(50% - 80px)", left: "auto", right: "-100px", bottom: "auto" },
        [Position.Bottom]: { top: "auto", left: "calc(50% - 80px)", right: "auto", bottom: "-100px" },
    }
    const iconPosition = {
        [Position.Left]: ChevronLeftIcon,
        [Position.Top]: ChevronUpIcon,
        [Position.Right]: ChevronRightIcon,
        [Position.Bottom]: ChevronDownIcon,
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
            visibility={visibility}
        >
            <Icon
                as={iconPosition[position]}
                backgroundColor={borderColor}
                borderRadius={"full"}
                borderColor={borderColor}
                color={borderColor}
                height={"8px"}
                width={"8px"}
                transition={"all 0.1s ease-in-out"}
                _groupHover={{
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: borderWidth,
                    height: "24px",
                    width: "24px",
                }}
            />
        </Flex>
    )
}

export function ElementShapeWhapper(ShapeComponent: FC<PropsWithChildren<{
    style: ElementStyleProperties;
    selected?: boolean;
}>>): FC<{
    data: IElement;
    style: ElementStyleProperties;
    selected?: boolean;
}> {
    return function WrappedElement({
        data,
        style,
        selected,
    }) {
        const positions = [Position.Left, Position.Top, Position.Right, Position.Bottom];

        return (
            <ShapeComponent data-group style={style} selected={selected}>
                {positions.map((position) => (
                    <ElementInteractiveHandle
                        key={`handle-arrow-${position}`}
                        backgroundColor={HexColor.withAlpha(style.background, 0.1)}
                        borderColor={HexColor.withAlpha(style.stroke, 0.7)}
                        borderWidth={style.strokeWidth}
                        position={position}
                        visibility={selected ? "visible" : "hidden"}
                    />
                ))}
                {positions.map((position) => (
                    <Handle
                        key={`handle-connect-${position}`}
                        id={`handle-connect-${position}`}
                        type={"source"}
                        position={position}
                        style={{ visibility: "hidden" }}
                    />
                ))}
                <ElementLabel data={data} style={style} selected={selected} showDescription />
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