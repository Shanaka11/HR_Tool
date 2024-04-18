export type ColumnDef<T> = {
  id: string;
  header: string;
  getValue: (row: T) => (string & {}) | keyof T;
  setValue?: (row: T, fieldName: string, value: keyof T) => T;
  editable?: boolean;
  insertable?: boolean;
  sortable?: boolean;
  visible?: boolean;
  filterable?: boolean;
};
