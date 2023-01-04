import { FC } from "react";
import {
    Flex,
    Input,
    Textarea
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Abstraction, AbstractionCallback } from "./c4-diagram";

export interface IAbstractionEditorProps {
    data: Abstraction;
    options: {
        technologies: Array<string>;
    },
    onChange?: AbstractionCallback;
}

export const AbstractionEditor: FC<IAbstractionEditorProps> = ({
    data,
    options,
    onChange
}) => {
    return data && (
        <Flex direction={"column"} gap={4}>
            <Input
                placeholder={"Enter the name of the abstraction"}
                value={data.title}
                variant={"filled"}
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
                variant={"filled"}
                onChange={(event) => {
                    onChange({
                        ...data,
                        technologies: event.map(x => x.value)
                    })
                }}
            />
            <Textarea
                placeholder={"Enter the description for the abstraction"}
                value={data.description}
                variant={"filled"}
                onChange={(event) => {
                    onChange && onChange({
                        ...data,
                        description: event.target.value
                    })
                }}
            />
        </Flex>
    )
}