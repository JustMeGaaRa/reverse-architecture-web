import { FC, MouseEventHandler, PropsWithChildren } from "react";
import {
    Button,
    ButtonGroup
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { Panel } from "./Panel";

export type EditorPanelProps = {
    onSave?: MouseEventHandler;
    onCancel?: MouseEventHandler;
}

export const EditorPanel: FC<PropsWithChildren<EditorPanelProps>> = ({
    children,
    onSave,
    onCancel
}) => {
    return (
        <Panel dock={"right-center"}>
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
                    variant={"ghost"}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </ButtonGroup>
        </Panel>
    );
}