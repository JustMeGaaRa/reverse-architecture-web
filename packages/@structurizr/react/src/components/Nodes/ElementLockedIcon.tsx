import { Icon } from "@chakra-ui/react";
import { Lock } from "iconoir-react";
import { FC } from "react";

export const ElementLockedIcon: FC<{ isLocked?: boolean }> = ({ isLocked }) => {
    return isLocked && (
        <Icon
            as={Lock}
            boxSize={4}
            color={"gray.400"}
            position={"absolute"}
            top={2}
            right={2}
        />
    )
}