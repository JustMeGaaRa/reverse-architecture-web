import { UserInfo } from "@workspace/core";
import { useCallback, useContext, useEffect } from "react";
import { WorkspaceRoomContext } from "../contexts";

const SharingOptionsMapName = "sharingOptions";
const SharingOptionsPresentationModeOnParam = "presentationModeOn";
const SharingOptionsPresentingUserParam = "presentingUser";

export const usePresentationMode = () => {
    const {
        workspaceDocument,
        currentUser,
        sharingOptions,
        setSharingOptions
    } = useContext(WorkspaceRoomContext);

    useEffect(() => {
        const map = workspaceDocument.getMap(SharingOptionsMapName);

        const updateSharingOptions = () => {
            setSharingOptions({
                presentationModeOn: map.get(SharingOptionsPresentationModeOnParam) as boolean,
                presentingUser: map.get(SharingOptionsPresentingUserParam) as UserInfo,
            });
        }

        map.observe(updateSharingOptions);

        return () => {
            map.unobserve(updateSharingOptions);
        }
    }, [workspaceDocument, setSharingOptions]);

    const startPresenting = useCallback(() => {
        const map = workspaceDocument.getMap(SharingOptionsMapName);
        map.set(SharingOptionsPresentationModeOnParam, true);
        map.set(SharingOptionsPresentingUserParam, currentUser.info);
    }, [workspaceDocument, currentUser.info]);

    const stopPresenting = useCallback(() => {
        const map = workspaceDocument.getMap(SharingOptionsMapName);
        map.set(SharingOptionsPresentationModeOnParam, false);
        map.set(SharingOptionsPresentingUserParam, undefined);
    }, [workspaceDocument]);

    return {
        presentationModeOn: sharingOptions.presentationModeOn,
        presentingUser: sharingOptions.presentingUser,
        startPresenting,
        stopPresenting,
    }
}