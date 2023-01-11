import { FC } from "react";
import {
    Editable,
    EditableInput,
    EditablePreview,
    HStack,
    StackDivider,
    Input,
    useColorModeValue
} from "@chakra-ui/react";
import { Logo } from "../Logo";
import { Panel } from "./Panel";

export type NavigationPanelProps = {
    diagram: {
        title: string;
    };
}

export const NavigationPanel: FC<NavigationPanelProps> = ({
    diagram
}) => {
    const dividerBorderColor = useColorModeValue("gray.200", "gray.700");
    const editableBackground = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

    return (
        <Panel dock={"top-left"}>
            <HStack
                borderRadius={"lg"}
                gap={2}
                divider={<StackDivider borderColor={dividerBorderColor} />}
            >
                <Logo />
                <Editable
                    defaultValue={diagram.title}
                    isPreviewFocusable={true}
                >
                    <EditablePreview
                        py={2}
                        px={4}
                        _hover={{
                            background: editableBackground
                        }}
                    />
                    <Input py={2} px={4} as={EditableInput} />
                </Editable>
            </HStack>
        </Panel>
    );
}