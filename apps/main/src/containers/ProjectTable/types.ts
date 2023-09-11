export type TableRowData = {
    key: string;
    checked: TableRowCheckedState;
    data: any;
}

export enum TableRowCheckedState {
    Checked = "checked",
    Unchecked = "unchecked",
    Indeterminate = "indeterminate",
}