import { FC, MouseEventHandler } from "react";
import { FaCheck } from "react-icons/fa";
import {
    Button,
    ButtonGroup,
    Flex,
    Textarea
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Relationship, RelationshipCallback } from "../c4-diagram";

export type RelationshipEditorProps = {
    data: Relationship;
    options: {
        technologies: Array<string>;
    },
    onChange?: RelationshipCallback;
    onSave?: MouseEventHandler;
    onCancel?: MouseEventHandler;
}

export const RelationshipEditor: FC<RelationshipEditorProps> = ({
    data,
    options,
    onChange,
    onSave,
    onCancel
}) => {
    return data && (
        <Flex direction={"column"} gap={4} width={["xs"]}>
            <Textarea
                height={[100]}
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
            <ButtonGroup size={"sm"} justifyContent={"center"}>
                <Button
                    leftIcon={<FaCheck />}
                    colorScheme={"blue"}
                    onClick={onSave}
                >
                    Save
                </Button>
                <Button
                    variant={"ghost"}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </ButtonGroup>
        </Flex>
    );
}