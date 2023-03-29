import { Identifier } from "@justmegaara/structurizr-dsl";
import { useState } from "react";

export const useSelectedView = () => {
    const [selectedView, setSelectedView] = useState<Identifier>();

    return {
        selectedView,
        setSelectedView
    }
}