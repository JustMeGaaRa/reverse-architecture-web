import { UserInfo } from "@workspace/core";
import { useCallback, useContext, useEffect } from "react";
import { WorkspaceRoomContext } from "../contexts";
import { PresentationEnabledParam, PresentationMapName, PresenterInfoParam } from "../types";

export const usePresentationMode = () => {
    const {
        workspaceDocument,
        currentUser,
        presentation,
        setPresentationOptions
    } = useContext(WorkspaceRoomContext);

    useEffect(() => {
        const map = workspaceDocument.getMap(PresentationMapName);

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
    }, [workspaceDocument, setPresentationOptions]);

    const startPresenting = useCallback(() => {
        const map = workspaceDocument.getMap(PresentationMapName);
        map.set(PresentationEnabledParam, true);
        map.set(PresenterInfoParam, currentUser.info);
    }, [workspaceDocument, currentUser.info]);

    const stopPresenting = useCallback(() => {
        const map = workspaceDocument.getMap(PresentationMapName);
        map.set(PresentationEnabledParam, false);
        map.set(PresenterInfoParam, undefined);
    }, [workspaceDocument]);

    return {
        ...presentation,
        startPresenting,
        stopPresenting,
    }
}