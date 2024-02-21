import { Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    StateMessage,
    usePageHeader
} from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC, useEffect } from "react";
import { HomePageResetActionsWrapper } from "../../home";

export const DashboardPage: FC = () => {
    const { setHeaderContent } = usePageHeader();

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
                        title={"No content created yet"}
                        description={"To get started, create some new projects."}
                    />
                </ContextSheetBody>
            </ContextSheet>
        </HomePageResetActionsWrapper>
    );
}