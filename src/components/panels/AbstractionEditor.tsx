import { FC } from "react";
import {
    Flex,
    Input,
    Textarea
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { EditorPanel, EditorPanelProps } from "./EditorPanel";
import { Abstraction, AbstractionCallback } from "../c4-diagram";

export type AbstractionEditorProps = EditorPanelProps & {
    data: Abstraction;
    options: {
        technologies: Array<string>;
    },
    onChange?: AbstractionCallback;
}

export const AbstractionEditor: FC<AbstractionEditorProps> = ({
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
            <Flex direction={"column"} gap={4} width={["xs"]}>
                <Input
                    placeholder={"Enter the name of the abstraction"}
                    value={data.title}
                    onFocusCapture={(event) => event.preventDefault()}
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
                    isClearable={false}
                    useBasicStyles
                    placeholder={"Select a list of technologies"}
                    options={options.technologies.map(t => ({ label: t, value: t }))}
                    value={data.technologies && data.technologies.map(t => ({ label: t, value: t }))}
                    onChange={(event) => {
                        onChange({
                            ...data,
                            technologies: event.map(x => x.value)
                        })
                    }}
                />
                <Textarea
                    height={[150]}
                    placeholder={"Enter the description for the abstraction"}
                    value={data.description}
                    onChange={(event) => {
                        onChange && onChange({
                            ...data,
                            description: event.target.value
                        })
                    }}
                />
            </Flex>
        </EditorPanel>
    );
}