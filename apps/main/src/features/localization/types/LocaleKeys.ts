export const LocaleKeys = {
    DASHBOARD_PAGE__NO_CONTENT__TITLE:          "app.dashboard.no-content.title",
    DASHBOARD_PAGE__NO_CONTENT__DESCRIPTION:    "app.dashboard.no-content.description",

    COMMUNITY_PAGE__TEMPLATE_LOADING_ERROR__TITLE:          "app.community.error.loading-templates-title",
    COMMUNITY_PAGE__TEMPLATE_LOADING_ERROR__DESCRIPTION:    "app.community.error.loading-templates-description",

    WORKSPACE_EXPLORER__NO_WORKSPACES__TITLE:   "app.workspaces.no-results.title",
    WORKSPACE_EXPLORER__NO_ARCHIVED__TITLE:     "app.archived.no-results.title",
    NO_SHARED_TITLE:                            "app.shared.no-results.title",
    NO_STACK_WORKSPACES_TITLE:                  "app.workspace-stack.no-resuts.title",
    
    NO_WORKSPACES_SUGGESTION:                   "app.workspaces.no-results.suggestion",
    NO_ARCHIVED_WORKSPACES_SUGGESTION:          "app.archived.no-results.suggestion",
    NO_SHARED_WORKSPACES_SUGGESTION:            "app.shared.no-results.suggestion",
    NO_STACK_WORKSPACES_SUGGESTION:             "app.workspace-stack.no-results.suggestion",

    NO_COMMUNITY_WORKSPACES_TITLE:              "app.community.no-results.title",
    NO_COMMUNITY_WORKSPACES_SUGGESTION:         "app.community.no-results.suggestion",

    LOADING_WORKSPCES_TITLE:                    "app.workspaces.loading.title",
    LOADING_WORKSPACES_DESCRIPTION:             "app.workspaces.loading.description",

    LOADING_TEMPLATES_TITLE:                    "app.community.loading.title",
    LOADING_TEMPLATES_DESCRIPTION:              "app.community.loading.description",

    ERROR_LOADING_WORKSPACES_TITLE:             "app.workspaces.error.loading-workspaces-title",
    ERROR_LOADING_WORKSPACES_DESCRIPTION:       "app.workspaces.error.loading-workspaces-description",
    ERROR_LOADING_TEMPLTES_TITLE:               "app.workspaces.error.loading-templates-title",
    ERROR_LOADING_TEMPLTES_DESCRIPTION:         "app.workspaces.error.loading-templates-description",

    SEARCH_PLACEHOLDER:                         "app.search.placeholder",
    SEARCH_NO_RESULTS_TITLE:                    "app.search.no-results.title",
    SEARCH_NO_RESULTS_SUGGESTION:               "app.search.no-results.suggestion",

    IMPORT_FILE_TITLE:                          "app.workspaces.import.title",
    IMPORT_FILE_DESCRIPTION:                    "app.workspaces.import.description",
}

export const enUSLocale = "en-US";
export const enUSLocaleStrings: Record<string, string> = {
    [LocaleKeys.DASHBOARD_PAGE__NO_CONTENT__TITLE]:         "No content created yet",
    [LocaleKeys.DASHBOARD_PAGE__NO_CONTENT__DESCRIPTION]:   "To get started, Create some content.",

    [LocaleKeys.WORKSPACE_EXPLORER__NO_WORKSPACES__TITLE]:  "No workspaces",
    [LocaleKeys.NO_WORKSPACES_SUGGESTION]:                  "To get started, create a workspace by clicking \"New Workspace\" button below.",

    [LocaleKeys.NO_SHARED_TITLE]:                           "No shared workspaces",
    [LocaleKeys.NO_SHARED_WORKSPACES_SUGGESTION]:           "To get started, share some workspaces from the \"My Workspaces\" tab.",
    
    [LocaleKeys.WORKSPACE_EXPLORER__NO_ARCHIVED__TITLE]:    "No archived workspaces",
    [LocaleKeys.NO_ARCHIVED_WORKSPACES_SUGGESTION]:         "To get started, archive some workspaces from the \"Me Workspaces\" tab.",
    
    [LocaleKeys.NO_STACK_WORKSPACES_TITLE]:             "No workspaces in stack",
    [LocaleKeys.NO_STACK_WORKSPACES_SUGGESTION]:        "There are no elements in workspace stack.",

    [LocaleKeys.NO_COMMUNITY_WORKSPACES_TITLE]:         "No community templates",
    [LocaleKeys.NO_COMMUNITY_WORKSPACES_SUGGESTION]:    "Please come back later or contribute to community on GitHub.",

    [LocaleKeys.LOADING_WORKSPCES_TITLE]:               "Loading workspaces",
    [LocaleKeys.LOADING_WORKSPACES_DESCRIPTION]:        "Please wait while we load your workspaces.",

    [LocaleKeys.LOADING_TEMPLATES_TITLE]:               "Loading community templates",
    [LocaleKeys.LOADING_TEMPLATES_DESCRIPTION]:         "Please wait while we load community templates.",

    [LocaleKeys.ERROR_LOADING_WORKSPACES_TITLE]:        "Cannot load workspaces",
    [LocaleKeys.ERROR_LOADING_WORKSPACES_DESCRIPTION]:  "Something went wrong while loading workspaces.",
    [LocaleKeys.ERROR_LOADING_TEMPLTES_TITLE]:          "Cannot load templates",
    [LocaleKeys.ERROR_LOADING_TEMPLTES_DESCRIPTION]:    "Something went wrong while loading community templates.",

    [LocaleKeys.SEARCH_PLACEHOLDER]:                    "Type \"/\" to search commands",
    [LocaleKeys.SEARCH_NO_RESULTS_TITLE]:               "No matches found",
    [LocaleKeys.SEARCH_NO_RESULTS_SUGGESTION]:          "We were not able to find anything that matches your query.",

    [LocaleKeys.IMPORT_FILE_TITLE]:                     "Drop the file",
    [LocaleKeys.IMPORT_FILE_DESCRIPTION]:               "Drag and drop a file to create a new workspace",
}