import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { Children, FC, PropsWithChildren } from "react";
import { SelectionItemProvider } from ".";
import { useOnSelectionChanged, useSelectionContainer } from "../hooks";

export const WorkspaceCards: FC<PropsWithChildren<{
    onSelected?: (indicies: Array<number>) => void;
}>> = ({
    children,
    onSelected
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });
    const { selectedIndicies } = useSelectionContainer();

    useOnSelectionChanged(onSelected);

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {Children.map(children, ((child, index) => (
                <SelectionItemProvider
                    key={index}
                    index={index}
                    isSelected={selectedIndicies.includes(index)}
                >
                    {child}
                </SelectionItemProvider>
            )))}
        </Grid>
    )
}