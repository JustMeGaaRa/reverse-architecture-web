import { Box, Divider, Flex } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle
} from "@reversearchitecture/ui";
import { WorkspaceEditor } from "@reversearchitecture/workspace-editor";
import {
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { FC, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { WorkspaceViewerSheet } from "../viewer";

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
                    <ContextSheetHeader>
                        <ContextSheetTitle title={"Code Editor"} />
                    </ContextSheetHeader>

                    <Divider />
                    
                    <ContextSheetBody>
                        <WorkspaceEditor
                            value={text}
                            onChange={handleOnChange}
                        />
                    </ContextSheetBody>
                </Box>
                <WorkspaceViewerSheet />
            </Flex>
        </ContextSheet>
    );
};