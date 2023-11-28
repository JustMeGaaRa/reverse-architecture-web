import { Workspace } from "@structurizr/dsl";
import { createContext } from "react";

export const WorkspaceContext = createContext<{ workspace: Workspace; }>({ workspace: Workspace.Empty });