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
      width={"x-small"}
      maxHeight={"sm"}
      padding={2}
      fontSize={"xs"}
      textColor={"whiteAlpha.900"}
      textAlign={"center"}
      borderRadius={"md"}
      bgColor={getAbstractionBgColor(typeCode)}
      onDragStart={(event) => onDragStart(event, typeCode)}
      _hover={{ opacity: .7 }}
      draggable
    >
      <Text>{title}</Text>
    </Box>
  );
};
