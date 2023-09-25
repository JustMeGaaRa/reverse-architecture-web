import { ContextSheet } from "@reversearchitecture/ui";
import { FC } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const WorkspaceModelingPage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ queryParams ] = useSearchParams([
        ["mode", "modeling"],
    ]);

    return (
        <ContextSheet>
             
        </ContextSheet>
    )
}