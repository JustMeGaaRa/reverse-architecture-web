import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import {
    ColorInputControl,
    NumberInputControl,
    SelectInputControl,
    SliderInputControl
} from "../Controls";
import {
    LineStyle,
    RelationshipStyleProperties,
    RoutingStyle
} from "../../dsl";

type RelatioshipStyleEditorProps = {
    properties: RelationshipStyleProperties;
};

export const RelationshipStyleEditor: FC<RelatioshipStyleEditorProps> = ({
    properties
}) => {
    return (
        <Flex direction={"column"} gap={2}>
            <SliderInputControl
                name={"Thikness"}
                value={properties.thikness}
                min={0}
                max={10}
            />
            <ColorInputControl
                name={"Color"}
                value={properties.color}
            />
            <SelectInputControl
                placeholder={"Select relationship style"}
                name={"Border"}
                value={properties.style}
                options={Object.keys(LineStyle).map(line => ({ value: line, name: LineStyle[line] }))}
            />
            <SelectInputControl
                placeholder={"Select relationship routing"}
                name={"Routing"}
                value={properties.routing}
                options={Object.keys(RoutingStyle).map(line => ({ value: line, name: RoutingStyle[line] }))}
            />
            <SliderInputControl
                name={"Font Size"}
                value={properties.fontSize}
                min={1}
                max={36}
            />
            <SliderInputControl
                name={"Width"}
                value={properties.width}
                min={100}
                max={1000}
            />
            <NumberInputControl
                name={"Position"}
                value={properties.position}
                min={0}
                max={100}
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