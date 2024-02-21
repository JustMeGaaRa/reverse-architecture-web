import { useCallback, useContext } from "react";
import { WorkspaceCollectionContext } from "../contexts";

export const useWorkspaceCollectionOptions = () => {
    const {
        selectedOptions,
        setSelectedOptions
    } = useContext(WorkspaceCollectionContext);

    const enableStacking = useCallback(() => {
        setSelectedOptions(options => {
            return {
                ...options,
                stack: {
                    ...options.stack,
                    isEnabled: true,
                },
                unstack: {
                    ...options.unstack,
                    isEnabled: true,
                },
            }
        });
    }, [setSelectedOptions]);

    const disableStacking = useCallback(() => {
        setSelectedOptions(options => {
            return {
                ...options,
                stack: {
                    ...options.stack,
                    isEnabled: false,
                },
                unstack: {
                    ...options.unstack,
                    isEnabled: false,
                },
            }
        });
    }, [setSelectedOptions]);

    const enableDeletion = useCallback(() => {
        setSelectedOptions(options => {
            return {
                ...options,
                remove: {
                    ...options.remove,
                    isEnabled: true,
                },
            }
        });
    }, [setSelectedOptions]);

    const disableDeletion = useCallback(() => {
        setSelectedOptions(options => {
            return {
                ...options,
                remove: {
                    ...options.remove,
                    isEnabled: false,
                },
            }
        });
    }, [setSelectedOptions]);

    const enableCloning = useCallback(() => {
        setSelectedOptions(options => {
            return {
                ...options,
                clone: {
                    ...options.clone,
                    isEnabled: true,
                },
            }
        });
    }, [setSelectedOptions]);

    const disableCloning = useCallback(() => {
        setSelectedOptions(options => {
            return {
                ...options,
                clone: {
                    ...options.clone,
                    isEnabled: false,
                },
            }
        });
    }, [setSelectedOptions]);

    return {
        stack: selectedOptions.stack,
        unstack: selectedOptions.unstack,
        remove: selectedOptions.remove,
        clone: selectedOptions.clone,
        archive: selectedOptions.archive,
        unarchive: selectedOptions.unarchive,
        enableStacking,
        disableStacking,
        enableDeletion,
        disableDeletion,
        enableCloning,
        disableCloning,
    }
}