import { FC, PropsWithChildren } from "react";
import {
    Editable,
    EditableInput,
    EditablePreview,
    HStack,
    StackDivider,
    useColorModeValue,
} from "@chakra-ui/react";
import { Logo } from "./Logo";

export type NavigationPanelProps = PropsWithChildren<{
    title: string;
    onTitleChange: (title: string) => void;
}>

export const NavigationPanel: FC<NavigationPanelProps> = ({
    children,
    title,
    onTitleChange
}) => {
    const dividerBorderColor = useColorModeValue("gray.200", "gray.700");
    const editableBgColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

    return (
        <HStack
            borderRadius={"lg"}
            gap={2}
            divider={<StackDivider borderColor={dividerBorderColor} />}
        >
            <Logo />
            
            <Editable
                value={title}
                isPreviewFocusable={true}
            >
                <EditablePreview
                    py={2}
                    px={4}
                    _hover={{
                        background: editableBgColor
                    }}
                />
                <EditableInput
                    py={2}
                    px={4}
                    onChange={(event) => onTitleChange(event.target.value)}
                />
            </Editable>
            
            {children}
        </HStack>
    );
}