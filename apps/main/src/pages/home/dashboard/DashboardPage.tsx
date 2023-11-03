import { Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    EmptyContent,
    HeaderContentSource,
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
                <HeaderContentSource section={"right"} />

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
        </HomePageLayoutContent>
    );
}