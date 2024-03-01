import { Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    StateMessage,
    useLocale
} from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import { LocaleKeys } from "../../../features";
import { HomePageResetActionsWrapper } from "../../home";

export const DashboardPage: FC = () => {
    const { getLocalizedString } = useLocale();
    
    return (
        <HomePageResetActionsWrapper>
            <ContextSheet>
                <ContextSheetHeader>
                    <ContextSheetTitle title={"Dashboard"} />
                </ContextSheetHeader>

                <Divider />

                <ContextSheetBody>
                    <StateMessage
                        icon={Folder}
                        title={getLocalizedString(LocaleKeys.DASHBOARD_PAGE__NO_CONTENT__TITLE)}
                        description={getLocalizedString(LocaleKeys.DASHBOARD_PAGE__NO_CONTENT__DESCRIPTION)}
                    />
                </ContextSheetBody>
            </ContextSheet>
        </HomePageResetActionsWrapper>
    );
}