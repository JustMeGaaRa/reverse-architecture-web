import { model, styles, views, workspace } from "../../../dsl";

export const Empty = workspace(
    "Empty",
    "An empty diagram",
    model(),
    views([], [], [], [], styles())
);