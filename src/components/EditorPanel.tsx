import { FC, MouseEventHandler, PropsWithChildren } from "react";
import {
    Button,
    ButtonGroup
} from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ControlPanel } from "./ControlPanel";

export interface IEditorPanelProps {
    onSave?: MouseEventHandler;
    onCancel?: MouseEventHandler;
}

export const EditorPanel: FC<PropsWithChildren<IEditorPanelProps>> = ({
    children,
    onSave,
    onCancel
}) => {
    return (
        <ControlPanel direction={"column"}>
            {children}
            <ButtonGroup size={"sm"} justifyContent={"center"}>
                <Button
                    leftIcon={<FaCheck />}
                    colorScheme={"blue"}
                    onClick={onSave}
                >
                    Save
                </Button>
                <Button
                    leftIcon={<FaTimes />}
                    colorScheme={"red"}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </ButtonGroup>
        </ControlPanel>
    )
}