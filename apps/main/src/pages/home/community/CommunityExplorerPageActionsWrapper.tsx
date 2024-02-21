import { Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import { usePageHeader, usePageSidebar } from "@reversearchitecture/ui";
import { PagePlus } from "iconoir-react";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";

export const CommunityExplorerPageActionsWrapper: FC<PropsWithChildren> = ({ children }) => {
    console.log("context wrapper: comunity explorer page");
    const { setShowSidebarButton } = usePageSidebar();
    const { setHeaderContent } = usePageHeader();

    const handleOnClickPublishWorkspace = useCallback(() => {
        throw new Error("Method not implemented.");
    }, []);

    useEffect(() => {
        setShowSidebarButton(true);
        setHeaderContent({
            right: (
                <ButtonGroup key={"community-page-actions"} gap={2} mr={4}>
                    <Button
                        aria-label={"publish workspace"}
                        colorScheme={"lime"}
                        isDisabled
                        leftIcon={<Icon as={PagePlus} boxSize={5} />}
                        iconSpacing={"0px"}
                        onClick={handleOnClickPublishWorkspace}
                    >
                        <Text marginX={2}>Publish to Community</Text>
                    </Button>
                </ButtonGroup>
            )
        })
    }, [handleOnClickPublishWorkspace, setHeaderContent, setShowSidebarButton]);
    
    return (
        <>
            {children}
        </>
    );
}