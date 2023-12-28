import { Icon, IconButton } from "@chakra-ui/react";
import { Redo } from "iconoir-react";
import { FC } from "react";
import { useUndoRedo } from "../hooks";

export const ActionRedoButton: FC = () => {
    const { redo } = useUndoRedo();

    return (
        <IconButton
            aria-label={"redo last change"}
            icon={<Icon as={Redo} boxSize={6} />}
            title={"redo last change"}
            onClick={() => redo()}
        />
    )
}