import { Divider } from "@chakra-ui/react";
import {
    Shell,
    ShellBody,
    ShellHeader,
    ShellTitle,
} from "@restruct/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import { StateMessage } from "../../../features";

export const ProfileSettingsContent: FC = () => {
    return (
        <Shell>
            <ShellHeader>
                <ShellTitle title={"Profile"} />
            </ShellHeader>

            <Divider />

            <ShellBody>
                <StateMessage
                    icon={Folder}
                    title={"No profile settings yet"}
                    description={"To get started, click the \"Create New Project\" button to create a new project."}
                />
            </ShellBody>
        </Shell>
    );
};