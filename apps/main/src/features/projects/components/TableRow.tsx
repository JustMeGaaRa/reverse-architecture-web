import { Checkbox, IconButton, Td, Tr } from "@chakra-ui/react";
import { MoreHoriz } from "iconoir-react";
import { ChangeEvent, FC, useCallback } from "react";
import { useTable } from "../hooks";
import { ItemCheckedState, TableColumnInfo } from "../types";

export const TableRow: FC<{
    data: any;
    columns: TableColumnInfo[];
    checked?: ItemCheckedState;
    onClick?: () => void;
}> = ({
    columns,
    data,
    checked,
    onClick
}) => {
    const { selectSingleRow } = useTable();

    const isChecked = checked === ItemCheckedState.Checked;

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
            ? ItemCheckedState.Checked
            : ItemCheckedState.Unchecked;
        selectSingleRow(data.projectId, checked);
    }, [data, selectSingleRow]);

    return (
        <Tr
            backgroundColor={isChecked ? "whiteAlpha.200" : undefined}
            borderRadius={16}
            cursor={"pointer"}
            _hover={{ background: "whiteAlpha.100" }}
            onClick={onClick}
        >
            <Td width={12}>
                <Checkbox
                    isChecked={isChecked}
                    onChange={handleOnChange}
                />
            </Td>
            {columns.map(({ name }) => (
                <Td key={name}>
                    {data[name]}
                </Td>
            ))}
            <Td width={12}>
                <IconButton
                    aria-label={"more options"}
                    colorScheme={"gray"}
                    icon={<MoreHoriz />}
                    size={"sm"}
                    variant={"ghost"}
                    title={"more options"}
                />
            </Td>
        </Tr>
    )
}