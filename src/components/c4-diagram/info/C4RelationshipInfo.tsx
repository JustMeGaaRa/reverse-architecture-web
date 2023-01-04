import { FC } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Relationship } from "../types";

export interface IRelationshipInfoProps {
  data: Relationship;
  align: "start" | "center" | "end";
  showTitle?: boolean;
  showTechnologies?: boolean;
}

export const C4RelationshipInfo: FC<IRelationshipInfoProps> = ({
  data,
  align,
  showTechnologies,
  showTitle
}) => {
  return (
    <VStack
      align={align}
      spacing={1}
    >
      {data.title && showTitle && (
          <Text
            fontSize={"xs"}
            noOfLines={3}
            textAlign={"center"}
            maxW={150}
          >
            {data.title}
          </Text>
      )}
      {data.technologies && showTechnologies && (
        <Text
          fontSize={"x-small"}
          noOfLines={1}
          textAlign={"center"}
        >
          {`[${data.technologies.join(" / ")}]`}
        </Text>
      )}
    </VStack>
  );
};
