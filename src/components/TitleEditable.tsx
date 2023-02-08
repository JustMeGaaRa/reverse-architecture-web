import { Editable, EditableInput, EditablePreview, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

type TitleEditableProps = {
    title,
    onTitleChange: (title: string) => void;
};

export const TitleEditable: FC<TitleEditableProps> = ({
    title,
    onTitleChange
}) => {
    
    const editableBgColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
    
    return (
        <Editable
            value={title}
            isPreviewFocusable={true}
        >
            <EditablePreview
                py={2}
                px={4}
                _hover={{ background: editableBgColor }}
            />
            <EditableInput
                py={2}
                px={4}
                onChange={(event) => onTitleChange(event.target.value)}
            />
        </Editable>
    );
}