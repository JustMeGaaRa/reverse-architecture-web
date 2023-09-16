import { Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    EmptyContent
} from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";

export const ProfileSheet: FC = () => {
    return (
        <ContextSheet>
            <ContextSheetHeader>
                <ContextSheetTitle title={"Profile"} />
            </ContextSheetHeader>

            <Divider />

            <ContextSheetBody>
                <EmptyContent
                    icon={Folder}
                    title={"No profile settings yet"}
                    description={"To get started, click the \"Create New Project\" button to create a new project."}
                />
            </ContextSheetBody>
        </ContextSheet>
    );
};