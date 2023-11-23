import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { Children, FC, PropsWithChildren } from "react";
import { SelectionItemProvider } from ".";
import { useOnSelectionChanged } from "../hooks";

export const WorkspaceCardList: FC<PropsWithChildren<{
    onSelected?: (indicies: Array<string>) => void;
}>> = ({
    children,
    onSelected
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });

    useOnSelectionChanged(onSelected);

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {Children.map(children, ((child, index) => (
                <SelectionItemProvider
                    key={index}
                    index={index}
                >
                    {child}
                </SelectionItemProvider>
            )))}
        </Grid>
    )
}