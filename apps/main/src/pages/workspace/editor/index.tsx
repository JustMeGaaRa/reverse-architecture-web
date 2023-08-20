import { Box, Divider, Flex } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { WorkspaceEditor } from "@reversearchitecture/workspace-editor";
import {
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { FC, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

export const CodeEditorSheet: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ state, setState ] = useState({
        showPages: false,
        showComments: false,
        showEditor: false,
        showTimer: false
    });
    const [ text, setText ] = useState("");
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata ] = useState(WorkspaceMetadata.Empty.toObject());
    
    const { parseStructurizr } = useStructurizrParser();

    const handleOnChange = useCallback((value: string) => {
        setText(value);
        setWorkspace(parseStructurizr(text));
    }, [parseStructurizr, text]);

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