import { Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import { PageHeaderSectionPortal } from "@reversearchitecture/ui";
import { PagePlus } from "iconoir-react";
import { FC, PropsWithChildren, useCallback } from "react";

export const CommunityExplorerPageActionsWrapper: FC<PropsWithChildren> = ({ children }) => {
    console.log("context wrapper: comunity explorer page");

    const handleOnClickPublishWorkspace = useCallback(() => {
        throw new Error("Method not implemented.");
    }, []);
    
    return (
        <>
            <PageHeaderSectionPortal section={"end"}>
                <ButtonGroup gap={2} mr={4}>
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
            </PageHeaderSectionPortal>

            {children}
        </>
    );
}