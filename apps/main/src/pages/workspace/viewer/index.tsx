import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, IconButton } from "@chakra-ui/react";
import { Workspace as WorkspaceType } from "@justmegaara/structurizr-dsl";
import { WorkspaceRenderer } from "@justmegaara/workspace-viewer";
import { WorkspaceApi } from "@reversearchitecture/services";
import { Panel } from "@reactflow/core";
import { BinMinus, ChatAdd, Circle, CursorPointer, DragHandGesture, Play, Redo, Rhombus, Square, Triangle, Undo } from "iconoir-react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextSheet } from "../../../components/ContextSheet";
import { Toolbar } from "../../../components/Toolbar";
import { ToolbalSection } from "../../../components/ToolbalSection";

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
                    <Toolbar>
                        <ToolbalSection>
                            <IconButton
                                aria-label={"cursor"}
                                title={"cursor"}
                                icon={<CursorPointer />}
                                />
                            <IconButton
                                aria-label={"drag"}
                                title={"drag"}
                                icon={<DragHandGesture />}
                            />
                        </ToolbalSection>
                        
                        <ToolbalSection>
                            <IconButton
                                aria-label={"person"}
                                title={"person"}
                                icon={<Square />}
                            />
                            <IconButton
                                aria-label={"software system"}
                                title={"software system"}
                                icon={<Circle />}
                            />
                            <IconButton
                                aria-label={"container"}
                                title={"container"}
                                icon={<Triangle />}
                            />
                            <IconButton
                                aria-label={"component"}
                                title={"component"}
                                icon={<Rhombus />}
                            />
                        </ToolbalSection>

                        <ToolbalSection>
                            <IconButton
                                aria-label={"comment"}
                                title={"comment"}
                                icon={<ChatAdd />}
                            />
                        </ToolbalSection>

                        <ToolbalSection>
                            <IconButton
                                aria-label={"delete selected element"}
                                icon={<BinMinus />}
                                title={"delete selected"}
                            />
                            <IconButton
                                aria-label={"undo last change"}
                                icon={<Undo />}
                                title={"undo last change"}
                            />
                            <IconButton
                                aria-label={"redo last change"}
                                icon={<Redo />}
                                title={"redo last change"}
                            />
                        </ToolbalSection>

                        <ToolbalSection>
                            <IconButton
                                aria-label={"presentation"}
                                title={"presentation"}
                                icon={<Play />}
                            />
                        </ToolbalSection>
                    </Toolbar>
                </Panel>
            </WorkspaceRenderer>
        </ContextSheet>
    );
};