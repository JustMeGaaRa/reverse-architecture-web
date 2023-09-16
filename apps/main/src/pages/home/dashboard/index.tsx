import { Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    EmptyContent
} from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { NavigationSource } from "../../../containers";

export const Dashboard: FC<PropsWithChildren> = () => {
    return (
        <ContextSheet>
            <NavigationSource />

            <ContextSheetHeader>
                <ContextSheetTitle title={"Dashboard"} />
            </ContextSheetHeader>

            <Divider />

            <ContextSheetBody>
                <EmptyContent
                    icon={Folder}
                    title={"No projects created yet"}
                    description={"To get started, click the \"Create New Project\" button to create a new project."}
                />
            </ContextSheetBody>
        </ContextSheet>
    );
}