import { Grid, GridItem } from "@chakra-ui/react";
import { FC } from "react";

export const InformationHeader: FC<{
    image?: any;
    title?: any;
    subtitle?: any;
    action?: any;
}> = ({
    image,
    title,
    subtitle,
    action
}) => {
    return (
        <Grid
            templateAreas={`"img title action" "img subtitle action"`}
            gridTemplateRows={"auto auto"}
            gridTemplateColumns={"auto 1fr auto"}
            columnGap={2}
            width={"100%"}
        >
            <GridItem area={"img"}>
                {image}
            </GridItem>
            <GridItem area={"title"}>
                {title}
            </GridItem>
            <GridItem area={"subtitle"}>
                {subtitle}
            </GridItem>
            <GridItem area={"action"}>
                {action}
            </GridItem>
        </Grid>
    )
}