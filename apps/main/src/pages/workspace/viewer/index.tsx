import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button
} from "@chakra-ui/react";
import { Workspace as WorkspaceType } from "@justmegaara/structurizr-dsl";
import { WorkspaceRenderer } from "@justmegaara/workspace-viewer";
import { WorkspaceApi } from "@reversearchitecture/services";
import {
    ContextSheet,
} from "@reversearchitecture/ui";
import { Panel } from "@reactflow/core";
import {
    Rhombus,
    Square,
    Triangle,
} from "iconoir-react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WorkspaceToolbar } from "../../../containers";

export const WorkspaceViewerSheet: FC<{

}> = () => {
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

    const colors = [
        {
            scheme: "yellow",
            color: "#E3FB51",
        },
        {
            scheme: "blue",
            color: "#0A84FF",
        },
        {
            scheme: "purple",
            color: "#BF5AF2",
        }
    ]
    const levels = [
        { name: "Context - [block name]" },
        { name: "Container - [block name]" },
        { name: "Component - [block name]" }
    ]

    return (
        <ContextSheet>
            <WorkspaceRenderer
                workspace={workspace}
            >
                <Panel position={"top-left"}>
                    <Breadcrumb separator={""}>
                        {levels.map((level, index) => (
                            <BreadcrumbItem
                                key={level.name}
                                isCurrentPage={index === levels.length - 1}
                            >
                                <BreadcrumbLink
                                    as={Button}
                                    backgroundColor={"gray.100"}
                                    borderColor={"gray.200"}
                                    borderWidth={1}
                                    borderRadius={8}
                                    colorScheme={colors[index].scheme}
                                    height={"24px"}
                                    leftIcon={
                                        <Triangle fontSize={6} color={colors[index].color} />
                                    }
                                    fontSize={"14px"}
                                    color={"gray.700"}
                                    _hover={{
                                        textDecoration: "none"
                                    }}
                                    _activeLink={{
                                        colorScheme: colors[index].scheme,
                                        backgroundColor: `${colors[index].scheme}.100`,
                                        borderColor: `${colors[index].scheme}.primary`,
                                        color: "basic.White"
                                    }}
                                >
                                    {level.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        ))}
                    </Breadcrumb>
                </Panel>
                <Panel position={"bottom-center"}>
                    <WorkspaceToolbar />
                </Panel>
            </WorkspaceRenderer>
        </ContextSheet>
    );
};