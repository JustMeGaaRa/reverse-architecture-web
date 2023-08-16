import { VStack, Text } from "@chakra-ui/react";
import { IElement, ElementStyleProperties, Tag } from "@structurizr/dsl";
import { FC } from "react";

export const formatExpandedTechnology = (data: IElement) => {
    const type = data.tags.filter(x => x.name !== Tag.Element.name).at(0);
    if (!type) return "";
    
    // return data?.technology && data?.technology.length > 0
    //     ? `[${type.name}: ${data.technology.map(x => x.name).join(", ")}]`
    //     : `[${type.name}]`;

    return type.name;
};

export const BoundaryElementLabel: FC<{
    data: IElement;
    style?: Partial<ElementStyleProperties>;
}> = ({
    data,
    style
}) => {
    return (
        <VStack
            align={"start"}
            color={style.color}
            spacing={0}
        >
            <Text
                fontSize={"medium"}
                noOfLines={1}
                textAlign={"center"}
                opacity={0.9}
            >
                {data.name}
            </Text>
            {data.tags && (
                <Text
                    fontSize={"small"}
                    noOfLines={1}
                    textAlign={"center"}
                    opacity={0.4}
                >
                    {formatExpandedTechnology(data)}
                </Text>
            )}
        </VStack>
    );
}