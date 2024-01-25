import { Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    MessageContent,
    usePageHeader
} from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC, useEffect } from "react";
import { HomePageLayoutContent } from "../../home";

export const DashboardPage: FC = () => {
    const { setHeaderContent } = usePageHeader();

    useEffect(() => {
        setHeaderContent({
            right: (<></>)
        })
    }, [setHeaderContent]);
    
    return (
        <HomePageLayoutContent>
            <ContextSheet>
                <ContextSheetHeader>
                    <ContextSheetTitle title={"Dashboard"} />
                </ContextSheetHeader>

                <Divider />

                <ContextSheetBody>
                    <MessageContent
                        icon={Folder}
                        title={"No content created yet"}
                        description={"To get started, create some new projects."}
                    />
                </ContextSheetBody>
            </ContextSheet>
        </HomePageLayoutContent>
    );
}