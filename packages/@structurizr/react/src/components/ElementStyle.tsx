import { IElementStyleProperties, Style } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

export const ElementStyle: FC<PropsWithChildren<{ style: Style<IElementStyleProperties> }>> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}