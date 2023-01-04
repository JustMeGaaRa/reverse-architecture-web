import { FC } from "react";
import { Handle, NodeProps, NodeToolbar, Position } from "reactflow";
import { FaTrash } from "react-icons/fa";
import { Flex, ButtonGroup, IconButton } from "@chakra-ui/react";
import { C4AbstractioInfo } from "../info/C4AbstractionInfo";
import { Abstraction } from "../types";
import { ControlPanel } from "../../ControlPanel";

export interface IAbstractionProps {
  abstraction: Abstraction;
  bgColor?: string;
  onDelete?: (data: Abstraction) => void;
}

export const C4RectangleNode: FC<NodeProps<IAbstractionProps>> = ({ data }) => {
  return (
    <Flex
      bgColor={data.bgColor}
      padding={4}
      borderRadius={"2xl"}
      justify={"center"}
      align={"center"}
      textColor={"whiteAlpha.900"}
      width={240}
      height={150}
    >
      <C4AbstractioInfo
        data={data.abstraction}
        align={"center"}
        showTechnologies
        showDescription
      />
      <NodeToolbar>
        <ControlPanel direction={"row"} padding={1}>
          <ButtonGroup size={"sm"} isAttached>
            <IconButton
              aria-label={"Delete"}
              colorScheme={"red"}
              icon={<FaTrash />}
              variant={"ghost"}
              onClick={() => data.onDelete && data.onDelete(data.abstraction)}
            />
          </ButtonGroup>
        </ControlPanel>
      </NodeToolbar>
      <Handle position={Position.Left} id="a" type={"source"} />
      <Handle position={Position.Top} id="b" type={"source"} />
      <Handle position={Position.Right} id="c" type={"source"} />
      <Handle position={Position.Bottom} id="d" type={"source"} />
    </Flex>
  );
};
