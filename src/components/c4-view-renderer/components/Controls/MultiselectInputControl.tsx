import {
    FormControl,
    FormLabel
} from "@chakra-ui/react";
import { FC } from "react";
import { Select } from "chakra-react-select";

export const MultiselectInputControl: FC<{
    placeholder?: string;
    name: string;
    value: Array<{ value: string, name: string }>;
    isRequired?: boolean;
    options: Array<{ value: string, name: string }>;
}> = ({
    placeholder,
    name,
    value,
    options,
    isRequired
}) => {
    // const selectRef = useRef<SelectInstance>(null);
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{name}</FormLabel>
            <Select
                // ref={selectRef}
                closeMenuOnSelect={false}
                isClearable={false}
                isMulti
                useBasicStyles
                placeholder={placeholder}
                options={options.map(t => ({ label: t.name, value: t.value }))}
                value={value?.map(t => ({ label: t.name, value: t.value }))}
                // onChange={() => setEdgeChanges({
                //     technology: selectRef.current.getValue().map(option => option["value"])
                // })}
            />
        </FormControl>
    )
}