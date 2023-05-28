import { useState } from "react";

export type ContentViewMode = "table" | "card";

export const useContentViewMode = (mode: ContentViewMode) => {
    
    const [ view, setView ] = useState<ContentViewMode>(mode);

    const toggleView = () => {
        setView(view === "table" ? "card" : "table");
    }

    return {
        view,
        setView,
        toggleView
    };
}