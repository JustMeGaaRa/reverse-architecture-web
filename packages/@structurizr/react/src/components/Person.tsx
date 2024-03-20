import { IPerson } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { PersonContext } from "../contexts";

export const Person: FC<PropsWithChildren<{ person: IPerson }>> = ({ children }) => {
    const [ person, setPerson ] = useState<IPerson>();
    
    return (
        <PersonContext.Provider value={{ person, setPerson }}>
            {children}
        </PersonContext.Provider>
    )
}