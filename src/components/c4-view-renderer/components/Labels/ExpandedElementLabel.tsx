import { FC } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Element } from "../../store/C4Diagram";

export const formatExpandedTechnology = (data: Element) => {
    // TODO: handle tags corectly
    const type = data.tags.filter(x => x.name !== "Element").at(0);
    return data?.technology && data?.technology.length > 0
        ? `[${type.name}: ${data.technology.map(x => x.name).join(", ")}]`
        : `[${type.name}]`;
};

export type ExpandedElementLabelProps = {
    data: Element;
}

export const ExpandedElementLabel: FC<ExpandedElementLabelProps> = ({
    data
}) => {
    return (
        <VStack
            align={"start"}
            spacing={0}
        >
            <Text
                fontSize={"medium"}
                noOfLines={1}
                textAlign={"center"}
            >
                {data.name}
            </Text>
            <Text
                fontSize={"small"}
                noOfLines={1}
                textAlign={"center"}
            >
                {formatExpandedTechnology(data)}
            </Text>
        </VStack>
    );
}