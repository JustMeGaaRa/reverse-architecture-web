import { Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    MessageContent
} from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";

export const ProfileSettingsContent: FC = () => {
    return (
        <ContextSheet>
            <ContextSheetHeader>
                <ContextSheetTitle title={"Profile"} />
            </ContextSheetHeader>

            <Divider />

            <ContextSheetBody>
                <MessageContent
                    icon={Folder}
                    title={"No profile settings yet"}
                    description={"To get started, click the \"Create New Project\" button to create a new project."}
                />
            </ContextSheetBody>
        </ContextSheet>
    );
};