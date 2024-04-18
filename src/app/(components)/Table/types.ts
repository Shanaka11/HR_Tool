export type ColumnDef<T> = {
  id: string;
  header: string;
  getValue: (row: T) => (string & {}) | keyof T;
  size?: ColumnSize;
  setValue?: (row: T, fieldName: string, value: keyof T) => T;
  editable?: boolean;
  insertable?: boolean;
  sortable?: boolean;
  hidden?: boolean;
  filterable?: boolean;
};

export type RowDef<T> = {
  selected: boolean;
  markedFor: MarkedFor;
  dataItem: T;
};

export type ColumnSize = "SMALL" | "MEDIUM" | "LARGE";
export type MarkedFor = "DELETE" | "INSERT" | "UPDATE" | "READ";
