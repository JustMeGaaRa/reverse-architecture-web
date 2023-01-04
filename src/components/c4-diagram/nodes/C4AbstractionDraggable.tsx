import { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { AbstractionTypeCode } from "../types";
import { getAbstractionBgColor } from "../utils";

export interface IC4AbstractionDraggableProps {
  typeCode: AbstractionTypeCode,
  title: string,
  onDragStart: (event: any, typeCode: string) => void
}

export const C4AbstractionDraggable: FC<IC4AbstractionDraggableProps> = ({
  typeCode,
  title,
  onDragStart
}) => {
  return (
    <Box
      borderRadius={"md"}
      bgColor={getAbstractionBgColor(typeCode)}
      draggable
      fontSize={"xs"}
      padding={2}
      textColor={"whiteAlpha.900"}
      textAlign={"center"}
      _hover={{ opacity: .7 }}
      onDragStart={(event) => onDragStart(event, typeCode)}
    >
      <Text>{title}</Text>
    </Box>
  );
};
