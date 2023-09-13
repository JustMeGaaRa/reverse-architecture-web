import { useState } from "react";

export enum ContentViewMode {
    Table = "table",
    Card = "card"
};

export const useContentViewMode = (mode: ContentViewMode) => {
    const [ view, setView ] = useState<ContentViewMode>(mode);

    const toggleView = () => {
        setView(view === ContentViewMode.Table
            ? ContentViewMode.Card
            : ContentViewMode.Table);
    }

    return {
        view,
        setView,
        toggleView
    };
}