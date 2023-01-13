import { FC, MouseEventHandler } from "react";
import { FaCheck } from "react-icons/fa";
import {
    Button,
    ButtonGroup,
    Flex,
    Input,
    Textarea
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Abstraction, AbstractionCallback } from "../c4-diagram";

export type AbstractionEditorProps = {
    data: Abstraction;
    options: {
        technologies: Array<string>;
    },
    onChange?: AbstractionCallback;
    onSave?: MouseEventHandler;
    onCancel?: MouseEventHandler;
}

export const AbstractionEditor: FC<AbstractionEditorProps> = ({
    data,
    options,
    onChange,
    onSave,
    onCancel
}) => {
    return data && (
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