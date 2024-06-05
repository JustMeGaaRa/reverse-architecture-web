import { ViewDefinition } from "@structurizr/dsl";
import { useEffect } from "react";
import { useWorkspaceNavigation } from "./useWorkspaceNavigation";

type CurrentViewCallbacks = {
    onChange?: (view: ViewDefinition) => void;
}

export const useOnUserViewChange = (callbacks: CurrentViewCallbacks) => {
    const { currentView } = useWorkspaceNavigation();
    const { onChange } = callbacks;

    useEffect(() => onChange?.(currentView), [currentView, onChange]);
}