import { HStack } from "@chakra-ui/react";
import { Workspace as WorkspaceType } from "@justmegaara/structurizr-dsl";
import { WorkspaceRenderer } from "@justmegaara/workspace-viewer";
import { WorkspaceApi } from "@reversearchitecture/services";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { Page } from "../../components/Page";
import { PageHeader } from "../../components/PageHeader";
import { PageBody } from "../../components/PageBody";
import { Navigation } from "../../components/Navigation";
import { NavigationBackButton } from "../../components/NavigationBackButton";
import { NavigationSidebar } from "../../components/NavigationSidebar";
import { NavigationContent } from "../../components/NavigationContent";
import { ContextSheet } from "../../components/ContextSheet";

export const Workspace: FC<PropsWithChildren<{

}>> = ({

}) => {
    const params = useParams<{ workspaceId: string }>();
    const [workspace, setWorkspace] = useState<WorkspaceType>();

    useEffect(() => {
        const api = new WorkspaceApi();
        api.getWorkspace(params.workspaceId)
            .then(workspace => {
                setWorkspace(JSON.parse(JSON.stringify(workspace)));
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.workspaceId]);

    return (
        <Page>
            <PageHeader>
                <HStack>
                    <NavigationBackButton />
                    <Logo />
                </HStack>
            </PageHeader>
            <PageBody>
                <Navigation>
                    <NavigationSidebar isExpanded={false}>

                    </NavigationSidebar>
                    <NavigationContent>
                        <ContextSheet>
                                <WorkspaceRenderer
                                    workspace={workspace}
                                >

                                </WorkspaceRenderer>
                        </ContextSheet>
                    </NavigationContent>
                </Navigation>
            </PageBody>
        </Page>
    )
}