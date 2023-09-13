export type ItemData = {
    key: string;
    checked: ItemCheckedState;
    data: any;
}

export enum ItemCheckedState {
    Checked = "checked",
    Unchecked = "unchecked",
    Indeterminate = "indeterminate",
}