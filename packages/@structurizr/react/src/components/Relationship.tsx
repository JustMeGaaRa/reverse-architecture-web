import { IRelationship } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { RelationshipContext } from "../contexts";

export const Relationship: FC<PropsWithChildren<{ relationship: IRelationship }>> = ({ children }) => {
    const [ relationship, setRelationship ] = useState<IRelationship>();

    return (
        <RelationshipContext.Provider value={{ relationship, setRelationship }}>
            {children}
        </RelationshipContext.Provider>
    )
}