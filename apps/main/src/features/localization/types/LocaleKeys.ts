export const LocaleKeys = {
    NO_WORKSPACES_TITLE:                "app.workspaces.no-results.title",
    NO_ARCHIVED_TITLE:                  "app.archived.no-results.title",
    NO_SHARED_TITLE:                    "app.shared.no-results.title",
    NO_STACK_WORKSPACES_TITLE:          "app.workspace-stack.no-resuts.title",
    
    NO_WORKSPACES_SUGGESTION:           "app.workspaces.no-results.suggestion",
    NO_ARCHIVED_WORKSPACES_SUGGESTION:  "app.archived.no-results.suggestion",
    NO_SHARED_WORKSPACES_SUGGESTION:    "app.shared.no-results.suggestion",
    NO_STACK_WORKSPACES_SUGGESTION:     "app.workspace-stack.no-results.suggestion",

    NO_COMMUNITY_WORKSPACES_TITLE:      "app.community.no-results.title",
    NO_COMMUNITY_WORKSPACES_SUGGESTION: "app.community.no-results.suggestion",

    ERROR_LOADING_WORKSPACES:           "app.workspaces.error.loading-workspaces",
    ERROR_LOADING_TEMPLTES:             "app.workspaces.error.loading-templates",

    SEARCH_PLACEHOLDER:                 "app.search.placeholder",
    SEARCH_NO_RESULTS_TITLE:            "app.search.no-results.title",
    SEARCH_NO_RESULTS_SUGGESTION:       "app.search.no-results.suggestion",
}

export const enUSLocale = "en-US";
export const enUSLocaleStrings: Record<string, string> = {
    [LocaleKeys.NO_WORKSPACES_TITLE]:               "No workspaces",
    [LocaleKeys.NO_ARCHIVED_TITLE]:                 "No archived workspaces",
    [LocaleKeys.NO_SHARED_TITLE]:                   "No shared workspaces",
    [LocaleKeys.NO_STACK_WORKSPACES_TITLE]:         "No workspaces in stack",
    
    [LocaleKeys.NO_WORKSPACES_SUGGESTION]:          "To get started, create a workspace by clicking \"New Workspace\" button below.",
    [LocaleKeys.NO_ARCHIVED_WORKSPACES_SUGGESTION]: "To get started, archive some workspaces from the \"Me Workspaces\" tab.",
    [LocaleKeys.NO_SHARED_WORKSPACES_SUGGESTION]:   "To get started, share some workspaces from the \"My Workspaces\" tab.",
    [LocaleKeys.NO_STACK_WORKSPACES_SUGGESTION]:    "There are no elements in workspace stack.",

    [LocaleKeys.NO_COMMUNITY_WORKSPACES_TITLE]:         "No community workspaces available yet",
    [LocaleKeys.NO_COMMUNITY_WORKSPACES_SUGGESTION]:    "To get started, click the \"New Workspace\" button to create a new project.",

    [LocaleKeys.ERROR_LOADING_WORKSPACES]:          "Something went wrong while loading workspaces.",
    [LocaleKeys.ERROR_LOADING_TEMPLTES]:            "Something went wrong while loading community templates.",

    [LocaleKeys.SEARCH_PLACEHOLDER]:                "Type \"/\" to search commands",
    [LocaleKeys.SEARCH_NO_RESULTS_TITLE]:           "No matches found",
    [LocaleKeys.SEARCH_NO_RESULTS_SUGGESTION]:      "We were not able to find anything that matches your query.",
}