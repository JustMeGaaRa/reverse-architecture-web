import { Icon, IconButton } from "@chakra-ui/react";
import { Undo } from "iconoir-react";
import { FC } from "react";
import { useUndoRedo } from "../hooks";

export const ActionUndoButton: FC = () => {
    const { undo } = useUndoRedo();

    return (
        <IconButton
            aria-label={"undo last change"}
            icon={<Icon as={Undo} boxSize={6} />}
            title={"undo last change"}
            onClick={() => undo()}
        />
    )
}