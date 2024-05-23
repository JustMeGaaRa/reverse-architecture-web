import { Divider } from "@chakra-ui/react";
import {
    Shell,
    ShellBody,
    ShellHeader,
    ShellTitle,
    useLocale
} from "@restruct/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import { LocaleKeys, StateMessage } from "../../../features";
import { HomeNavigationActions } from "../../home";

export const DashboardPage: FC = () => {
    const { getLocalizedString } = useLocale();
    
    return (
        <Shell>
            <HomeNavigationActions />
            
            <ShellHeader>
                <ShellTitle title={"Dashboard"} />
            </ShellHeader>

            <Divider />

            <ShellBody>
                <StateMessage
                    icon={Folder}
                    title={getLocalizedString(LocaleKeys.DASHBOARD_PAGE__NO_CONTENT__TITLE)}
                    description={getLocalizedString(LocaleKeys.DASHBOARD_PAGE__NO_CONTENT__DESCRIPTION)}
                />
            </ShellBody>
        </Shell>
    );
}