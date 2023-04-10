import {
    Box
} from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const WorkspacePreviewCard: FC<PropsWithChildren<{

}>> = ({

}) => {
    return (
        <Box
            borderWidth={1}
            borderRadius={16}
            height={240}
            width={280}
        />
    )
}