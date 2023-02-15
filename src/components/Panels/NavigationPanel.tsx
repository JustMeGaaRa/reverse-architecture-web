import { HStack, StackDivider, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { Panel } from "./Panel";
import { useExports } from "../c4-view-renderer/hooks/useExports";
import { useC4BuilderStore } from "../c4-view-renderer/store";
import { Logo, TitleEditable, ExportMenu } from "..";

export type NavigationPanelProps = unknown;

export const NavigationPanel: FC<NavigationPanelProps> = () => {
    const dividerBorderColor = useColorModeValue("gray.200", "gray.700");
    
    const { title, setTitle } = useC4BuilderStore();
    const { exports } = useExports();

    return (
        <Panel
            dock={"top-left"}
            paddingX={4}
            paddingY={2}
        >
            <HStack
                gap={2}
                divider={<StackDivider borderColor={dividerBorderColor} />}
            >
                <Logo />
                
                <TitleEditable title={title} onTitleChange={setTitle} />
                
                <ExportMenu filename={title} items={exports} />
            </HStack>
        </Panel>
    );
}