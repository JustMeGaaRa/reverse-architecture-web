import { Button, ButtonGroup, Icon, IconButton, Text } from "@chakra-ui/react";
import { PageHeaderSectionPortal } from "@reversearchitecture/ui";
import { PagePlus, Upload } from "iconoir-react";
import { FC, PropsWithChildren, useCallback } from "react";
import { validateStructurizr } from "structurizr";
import { useFilePicker } from "use-file-picker";
import { useAccount, useSnackbar, useWorkspaceExplorer } from "../../../features";

export const WorkspaceExplorerPageActionWrapper: FC<PropsWithChildren> = ({ children }) => {
    console.log("context wrapper: workspace explorer page")

    const { account } = useAccount();
    const { snackbar } = useSnackbar();
    const { create } = useWorkspaceExplorer();

    const createWorkspaceFromFile = useCallback((content: string) => {
        // TODO: when loading a workspace file, we shoul show a loading indicator
        if (validateStructurizr(content)) {
            create(account.username, { content: { structurizr: content } });
        }
        else {
            // TODO: workspace file is not valid, so show error message
        }
    }, [account.username, create]);
    
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
        create(account.username);
    }, [account.username, create]);

    return (
        <>
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

            {children}
        </>
    )
}