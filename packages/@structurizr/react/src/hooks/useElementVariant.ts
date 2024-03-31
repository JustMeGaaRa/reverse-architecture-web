import { CSSProperties, useContext, useMemo } from "react";
import { ElementVariantContext } from "../contexts";

export type ElementVariantStyle = {
    container: CSSProperties;
    title: CSSProperties;
    description: CSSProperties;
    technology: CSSProperties;
}

export const getVariantStyles = (variant: string) => {
    switch (variant) {
        case "model":
            return elementModelVariantStyles;
        case "view":
            return elementViewVariantStyles;
        default:
            return elementViewVariantStyles;
    }
}

export const elementModelVariantStyles: ElementVariantStyle = {
    container: {
        height: 70,
        width: 300
    },
    title: {
        display: "block",
        textAlign: "left"
    },
    description: {
        display: "block",
        textAlign: "left"
    },
    technology: {
        display: "block",
        textAlign: "left"
    }
}
export const elementViewVariantStyles: ElementVariantStyle = {
    container: {
        height: 200,
        width: 200
    },
    title: {
        display: "block",
        textAlign: "center"
    },
    description: {
        display: "block",
        textAlign: "center"
    },
    technology: {
        display: "block",
        textAlign: "center"
    }
}

export const useElementVariant = () => {
    const { variant, setVariant } = useContext(ElementVariantContext);
    const variantStyles = useMemo(() => getVariantStyles(variant), [variant]);

    return { variant, setVariant, variantStyles };
}