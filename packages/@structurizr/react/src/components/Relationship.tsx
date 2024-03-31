import { IRelationship } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { RelationshipContext } from "../contexts";

export const Relationship: FC<PropsWithChildren<{ relationship: IRelationship }>> = ({ children, relationship }) => {
    return (
        <RelationshipContext.Provider value={{ relationship }}>
            {children}
        </RelationshipContext.Provider>
    )
}