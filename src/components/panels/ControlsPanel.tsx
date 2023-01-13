import { FC } from "react";
import { FaTrash, FaRedoAlt, FaUndoAlt, FaAngleDoubleRight } from "react-icons/fa";
import {
    ButtonGroup,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import { AbstractionTypeCode, getAbstractionName } from "../c4-diagram";
import { C4RectangleDraggable } from "../c4-diagram/NodeTypes";
import { Panel, PanelProps } from "../../components/panels/Panel";

export type ControlsPanelProps = Partial<Pick<PanelProps, "dock">> & {
    onDragStart?: (event, data) => void;
};

export const ControlsPanel: FC<ControlsPanelProps> = ({
    dock,
    onDragStart
}) => {
    const defaultBgColor = useColorModeValue("whiteAlpha.900", "gray.900");
    const { isOpen, onToggle } = useDisclosure();
    
    // TODO: move these codes outside from components
    const abstractionCodes = [
        AbstractionTypeCode.SoftwareSystem,
        AbstractionTypeCode.Container,
        AbstractionTypeCode.Component,
        AbstractionTypeCode.Person
    ];

    return (
        <Panel dock={dock ?? "left-center"}>
            <ButtonGroup
                isAttached
                orientation={"vertical"}
                size={"md"}
                variant={"ghost"}
            >
                <Popover
                    isOpen={isOpen}
                    closeOnBlur
                    closeOnEsc
                    placement={"right-start"}
                >
                    <PopoverTrigger>
                        <IconButton
                            aria-label={"show shapes"}
                            icon={<FaAngleDoubleRight />}
                            title={"show shapes"}
                            onClick={onToggle}
                        />
                    </PopoverTrigger>
                    <PopoverContent background={defaultBgColor} width={"36"}>
                        <PopoverBody display={"flex"} flexDirection={"column"} gap={2}>
                            {abstractionCodes.map(type => (
                                <C4RectangleDraggable
                                    key={type}
                                    typeCode={type}
                                    title={getAbstractionName(type)}
                                    onDragStart={(event) => onDragStart(event, type)}
                                />
                            ))}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                
                <IconButton
                    aria-label={"delete selected element"}
                    icon={<FaTrash />}
                    title={"delete selected"}
                />
                <IconButton
                    aria-label={"undo last change"}
                    icon={<FaUndoAlt />}
                    title={"undo last change"}
                />
                <IconButton
                    aria-label={"redo last change"}
                    icon={<FaRedoAlt />}
                    title={"redo last change"}
                />
            </ButtonGroup>
        </Panel>
    );
}