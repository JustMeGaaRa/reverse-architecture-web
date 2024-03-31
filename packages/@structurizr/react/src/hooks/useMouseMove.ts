import { useEffect } from "react";

export const useMouseMove = (node: HTMLElement, callback: (event: MouseEvent) => void) => {
    useEffect(() => {
        node?.addEventListener("mousemove", callback);

        return () => {
            node?.removeEventListener("mousemove", callback);
        }
    }, [node, callback]);
}

export const useMouseEnter = (node: HTMLElement, callback: (event: MouseEvent) => void) => {
    useEffect(() => {
        node?.addEventListener("mouseenter", callback);

        return () => {
            node?.removeEventListener("mouseenter", callback);
        }
    }, [node, callback]);
}

export const useMouseLeave = (node: HTMLElement, callback: (event: MouseEvent) => void) => {
    useEffect(() => {
        node?.addEventListener("mouseleave", callback);

        return () => {
            node?.removeEventListener("mouseleave", callback);
        }
    }, [node, callback]);
}