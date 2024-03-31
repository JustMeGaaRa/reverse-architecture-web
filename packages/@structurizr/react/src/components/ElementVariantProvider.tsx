import { FC, PropsWithChildren, useState } from "react";
import { ElementVariant, ElementVariantContext } from "../contexts";

export const ElementVariantProvider: FC<PropsWithChildren<{ initialVariant?: ElementVariant }>> = ({ children, initialVariant }) => {
    const [ variant, setVariant ] = useState<ElementVariant>(initialVariant);
    
    return (
        <ElementVariantContext.Provider value={{ variant, setVariant }}>
            {children}
        </ElementVariantContext.Provider>
    );
}