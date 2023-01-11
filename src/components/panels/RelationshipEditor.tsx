import { FC } from "react";
import {
    Flex,
    Textarea
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { EditorPanel, EditorPanelProps } from "./EditorPanel";
import { Relationship, RelationshipCallback } from "../c4-diagram";

export type RelationshipEditorProps = EditorPanelProps & {
    data: Relationship;
    options: {
        technologies: Array<string>;
    },
    onChange?: RelationshipCallback;
}

export const RelationshipEditor: FC<RelationshipEditorProps> = ({
    data,
    options,
    onChange,
    onSave,
    onCancel
}) => {
    return data && (
        <EditorPanel
            onSave={onSave}
            onCancel={onCancel}
        >
            <Flex direction={"column"} gap={4}>
                <Textarea
                    value={data.title}
                    placeholder={"Enter the title of the relationship"}
                    onChange={(event) => {
                        onChange && onChange({
                            ...data,
                            title: event.target.value
                        })
                    }}
                />
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    placeholder={"Select a list of technologies"}
                    options={options.technologies.map(t => ({ label: t, value: t }))}
                    value={data.technologies && data.technologies.map(t => ({ label: t, value: t }))}
                    onChange={(event) => {
                        onChange && onChange({
                            ...data,
                            technologies: event.map(x => x.value)
                        })
                    }}
                />
            </Flex>
        </EditorPanel>
    );
}