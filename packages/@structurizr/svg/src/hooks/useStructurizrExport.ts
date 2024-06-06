import { useCallback } from "react";

export const useStructurizrExport = () => {
    const exportToSvg = useCallback(() => {
        const domNode = document.getElementsByClassName("structurizr__viewport").item(0);
        const svgClone = domNode?.cloneNode(true) as SVGSVGElement;
        if (!domNode) return "";
        svgClone.setAttribute("height", "1280");
        svgClone.setAttribute("width", "1280");
        const svgOuterHTML = svgClone.outerHTML;
        return svgOuterHTML;
    }, []);

    return { exportToSvg };
}