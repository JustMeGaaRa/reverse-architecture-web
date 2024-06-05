import { createContext } from "react";

export type ElementVariant = "model" | "view" | "custom";

export const ElementVariantContext = createContext<{
    variant?: ElementVariant | string;
    setVariant?: (variant: ElementVariant) => void;
}>({
    variant: undefined,
    setVariant: () => { console.debug("ElementVariantContext: setVariant not implemented") }
})