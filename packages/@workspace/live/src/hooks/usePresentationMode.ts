import { useYjsCollaborative } from "@yjs/react";
import { useCallback, useContext, useEffect } from "react";
import { WorkspaceRoomContext } from "../contexts";
import { PresentationEnabledParam, PresentationMapName, PresenterInfoParam, UserInfo } from "../types";

export const usePresentationMode = () => {
    const { currentUser, presentation, setPresentationOptions } = useContext(WorkspaceRoomContext);
    const { document } = useYjsCollaborative();

    useEffect(() => {
        const map = document.getMap(PresentationMapName);

        const updatePresentationOptions = () => {
            setPresentationOptions(state => ({
                ...state,
                presentationEnabled: map.get(PresentationEnabledParam) as boolean,
                presenterInfo: map.get(PresenterInfoParam) as UserInfo,
            }));
        }

        map.observe(updatePresentationOptions);

        return () => {
            map.unobserve(updatePresentationOptions);
        }
    }, [document, setPresentationOptions]);

    const startPresenting = useCallback(() => {
        const map = document.getMap(PresentationMapName);
        map.set(PresentationEnabledParam, true);
        map.set(PresenterInfoParam, currentUser.info);
    }, [document, currentUser.info]);

    const stopPresenting = useCallback(() => {
        const map = document.getMap(PresentationMapName);
        map.set(PresentationEnabledParam, false);
        map.set(PresenterInfoParam, undefined);
    }, [document]);

    return {
        ...presentation,
        startPresenting,
        stopPresenting,
    }
}