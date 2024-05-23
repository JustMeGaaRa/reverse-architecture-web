import { Button, ButtonGroup, Icon, IconButton, Text } from "@chakra-ui/react";
import { PageHeaderSectionPortal, useSnackbar } from "@restruct/ui";
import { parseWorkspace } from "@structurizr/parser";
import { PagePlus, Upload } from "iconoir-react";
import { FC, useCallback } from "react";
import { useFilePicker } from "use-file-picker";
import { useAccount, useWorkspaceExplorer } from "../../../features";

export const WorkspaceExplorerHeaderActions: FC = () => {
    const { account } = useAccount();
    const { snackbar } = useSnackbar();
    const { create } = useWorkspaceExplorer();

    // TODO: wrap creation button into separate component to avoid re-rendering
    const createWorkspaceFromFile = useCallback((content: string) => {
        // TODO: when loading a workspace file, we shoul show a loading indicator
        parseWorkspace(
            content,
            errors => {
                // TODO: workspace file is not valid, so show error message
                snackbar({
                    title: "Error importing workspace",
                    description: errors[0].message,
                    status: "error",
                })
            },
            workspace => {
                create(account.fullname, workspace);
            }
        )
    }, [account.fullname, create, snackbar]);
    
    const { openFilePicker } = useFilePicker({
        accept: ".dsl",
        multiple: false,
        readAs: "Text",
        readFilesContent: true,
        onFilesRejected: ({ errors }) => {
            snackbar({
                title: "Error importing workspace",
                description: errors[0] as string,
                status: "error",
            })
        },
        onFilesSuccessfullySelected: ({ filesContent }) => {
            createWorkspaceFromFile(filesContent[0].content);
        },
    });

    const handleOnClickWorkspaceImport = useCallback(() => {
        // NOTE: don't include in the dependency array as
        // this function is not wrapped in a 'useCallback' and causes infinite re-renders
        openFilePicker();
    }, []);
    
    const handleOnClickWorkspaceCreate = useCallback(() => {
        create(account.username)
    }, [account.username, create]);

    return (
        <PageHeaderSectionPortal section={"end"}>
            <ButtonGroup mr={4} variant={"filled"}>
                <IconButton
                    aria-label={"import workspace"}
                    colorScheme={"gray"}
                    icon={<Icon as={Upload} boxSize={5} />}
                    title={"Import Workspace"}
                    onClick={handleOnClickWorkspaceImport}
                />
                <Button
                    aria-label={"new project"}
                    colorScheme={"lime"}
                    leftIcon={<Icon as={PagePlus} boxSize={5} />}
                    iconSpacing={"0px"}
                    onClick={handleOnClickWorkspaceCreate}
                >
                    <Text marginX={2}>New Workspace</Text>
                </Button>
            </ButtonGroup>
        </PageHeaderSectionPortal>
    )
}