import { Flex } from "@chakra-ui/react";
import {
    ElementStyleProperties,
    LineStyle,
    ShapeType
} from "@justmegaara/structurizr-dsl";
import { FC } from "react";
import {
    ColorInputControl,
    SelectInputControl,
    SliderInputControl,
    StringInputControl
} from "../Controls";

type ElementStyleEditorProps = {
    properties: ElementStyleProperties;
};

export const ElementStyleEditor: FC<ElementStyleEditorProps> = ({
    properties
}) => {
    return (
        <Flex direction={"column"} gap={2}>
            <SelectInputControl
                placeholder={"Select element shape"}
                name={"Shape"}
                value={properties.shape}
                options={Object.keys(ShapeType).map(shape => ({ value: shape, name: ShapeType[shape] }))}
            />
            <StringInputControl
                placeholder={"Enter icon url"}
                name={"Icon"}
                value={properties.icon}
            />
            <SliderInputControl
                name={"Width"}
                value={properties.width}
                min={100}
                max={1000}
            />
            <SliderInputControl
                name={"Height"}
                value={properties.height}
                min={100}
                max={1000}
            />
            <ColorInputControl
                name={"Background"}
                value={properties.background}
            />
            <ColorInputControl
                name={"Color"}
                value={properties.color}
            />
            <ColorInputControl
                name={"Stroke"}
                value={properties.stroke}
            />
            <SliderInputControl
                name={"Stroke Width"}
                value={properties.strokeWidth}
                min={0}
                max={10}
            />
            <SliderInputControl
                name={"Font Size"}
                value={properties.fontSize}
                min={1}
                max={36}
            />
            <SelectInputControl
                placeholder={"Select element border"}
                name={"Border"}
                value={properties.border}
                options={Object.keys(LineStyle).map(line => ({ value: line, name: LineStyle[line] }))}
            />
            <SliderInputControl
                name={"Opacity"}
                value={properties.opacity}
                min={0}
                max={100}
            />
        </Flex>
    )
}