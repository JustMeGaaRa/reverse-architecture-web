import { Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import { PageHeaderSectionPortal } from "@restruct/ui";
import { PagePlus } from "iconoir-react";
import { FC, useCallback } from "react";

export const CommunityExplorerActions: FC = () => {
    const handleOnClickPublishWorkspace = useCallback(() => {
        throw new Error("Method not implemented.");
    }, []);
    
    return (
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
    );
}