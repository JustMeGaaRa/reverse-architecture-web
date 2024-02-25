import { Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    StateMessage,
    useLocale,
    usePageHeader
} from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC, useEffect } from "react";
import { LocaleKeys } from "../../../features";
import { HomePageResetActionsWrapper } from "../../home";

export const DashboardPage: FC = () => {
    const { setHeaderContent } = usePageHeader();
    const { getLocalizedString } = useLocale();

    useEffect(() => {
        setHeaderContent({
            right: (<></>)
        })
    }, [setHeaderContent]);
    
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