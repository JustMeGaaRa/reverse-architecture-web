import { Box, Divider, Flex, useToast } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { WorkspaceEditor } from "@reversearchitecture/workspace-editor";
import {
    useMetadata,
    WorkspaceBreadcrumbs,
    WorkspaceExplorer,
    WorkspaceZoomControls
} from "@reversearchitecture/workspace-viewer";
import {
    IWorkspaceMetadata,
    IViewDefinition,
    Workspace,
    applyMetadata,
    applyTheme,
    IWorkspaceTheme
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommunityHubApi } from "../../../services";

export const CodeEditorSheet: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ state, setState ] = useState({
        showPages: false,
        showComments: false,
        showEditor: false,
        showTimer: false
    });
    const [ text, setText ] = useState("");
    const [ workspace, setWorkspace ] = useState(Workspace.Empty);
    const [ metadata,  ] = useState<IWorkspaceMetadata>();

    const { setMetadata, setElementPosition } = useMetadata();
    const parseWorkspace = useStructurizrParser();

    const handleOnChange = useCallback((value: string) => {
        setText(value);
        setWorkspace(parseWorkspace(text));
        setMetadata(metadata);
    }, [parseWorkspace, text, metadata, setMetadata]);

    return (
        <ContextSheet>
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <Box width={"1200px"}>
                    <ContextSheetHeader title={"Code Editor"} />
                    <Divider />
                    <ContextSheetContent padding={0}>
                        <WorkspaceEditor
                            value={text}
                            onChange={handleOnChange}
                        />
                    </ContextSheetContent>
                </Box>
                <ContextSheet>
                </ContextSheet>
            </Flex>
        </ContextSheet>
    );
};