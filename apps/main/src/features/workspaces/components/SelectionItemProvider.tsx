import { FC, PropsWithChildren } from "react";
import { SelectionItemContext } from "../contexts";

export const SelectionItemProvider: FC<PropsWithChildren<{
    index: number;
    isSelected?: boolean;
}>> = ({
    children,
    index,
    isSelected
}) => {
    return (
        <SelectionItemContext.Provider value={{ index, isSelected }}>
            {children}
        </SelectionItemContext.Provider>
    )
}