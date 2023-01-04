import { FC } from "react";
import {
    Flex,
    Textarea
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Relationship, RelationshipCallback } from "./c4-diagram";

export interface IRelationshipEditorProps {
    data: Relationship;
    options: {
        technologies: Array<string>;
    },
    onChange?: RelationshipCallback;
}

export const RelationshipEditor: FC<IRelationshipEditorProps> = ({
    data,
    options,
    onChange
}) => {
    return data && (
        <Flex direction={"column"} gap={4}>
            <Textarea
                placeholder={"Enter the title of the relationship"}
                value={data.title}
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
                options={options.technologies.map(t => ({ label: t, value: t }))}
                placeholder={"Select a list of technologies"}
                value={data.technologies && data.technologies.map(t => ({ label: t, value: t }))}
                onChange={(event) => {
                    onChange && onChange({
                        ...data,
                        technologies: event.map(x => x.value)
                    })
                }}
            />
        </Flex>
    )
}