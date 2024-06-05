import { IRelationshipStyleProperties, Style } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

export const RelationshipStyle: FC<PropsWithChildren<{ style: Style<IRelationshipStyleProperties> }>> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}