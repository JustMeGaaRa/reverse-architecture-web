import { IContainerInstance } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ContainerInstanceContext } from "../contexts";

export const ContainerInstance: FC<PropsWithChildren<{ containerInstance: IContainerInstance }>> = ({ children }) => {
    const [ containerInstance, setContainerInstance ] = useState<IContainerInstance>();

    return (
        <ContainerInstanceContext.Provider value={{ containerInstance, setContainerInstance }}>
            {children}
        </ContainerInstanceContext.Provider>
    )
}