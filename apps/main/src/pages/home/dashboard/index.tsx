import { Box, Divider, Flex } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader,
    EmptyContent
} from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigationContext } from "../../../containers";

export const Dashboard: FC<PropsWithChildren<{

}>> = ({

}) => {
    const { setAvailableActions } = useNavigationContext();

    useEffect(() => {
        setAvailableActions([]);
    }, [setAvailableActions]);

    return (
        <ContextSheet>
            <ContextSheetHeader title={"Dashboard"} />
            <Divider />
            <ContextSheetContent>
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"100%"}
                    width={"100%"}
                >
                    <EmptyContent
                        icon={Folder}
                        title={"No projects created yet"}
                        description={"To get started, click the \"Create New Project\" button to create a new project."}
                    />
                </Flex>
            </ContextSheetContent>
        </ContextSheet>
    );
}