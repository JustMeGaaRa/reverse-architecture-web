import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Editable,
    EditableInput,
    EditablePreview,
    Text
} from "@chakra-ui/react"
import { IWorkspace } from "@structurizr/react";
import { FC, useCallback } from "react"
import { NavLink } from "react-router-dom";

export const WorksapceTitleBreadcrumb: FC<{
    workspace: IWorkspace;
}> = ({
    workspace
}) => {
    const handleOnChangeWorkspaceName = useCallback((value: string) => {
        throw new Error("Not implemented");
    }, []);
    
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink as={NavLink} to={"/workspaces"} marginX={2}>
                    <Text textStyle={"b2"} color={"gray.900"} noOfLines={1}>
                        My Workspaces
                    </Text>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink marginX={2}>
                    <Editable
                        maxWidth={"300px"}
                        textStyle={"b2"}
                        defaultValue={workspace.name}
                        onBlur={handleOnChangeWorkspaceName}
                    >
                        <EditablePreview noOfLines={1} />
                        <EditableInput />
                    </Editable>
                </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}