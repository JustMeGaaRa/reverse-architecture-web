import { IContainer } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ContainerContext } from "../contexts";

export const Container: FC<PropsWithChildren<{ container: IContainer }>> = ({ children }) => {
    const [ container, setContainer ] = useState<IContainer>();
    
    return (
        <ContainerContext.Provider value={{ container, setContainer }}>
            {children}
        </ContainerContext.Provider>
    )
}