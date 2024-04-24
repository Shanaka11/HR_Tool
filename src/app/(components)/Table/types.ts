import { ValueOf } from "@/lib/valueOf";
import { ZodSchema } from "zod";

export type ColumnType = "TEXT" | "NUMBER" | "DATE";

export type ColumnDef<T> = {
  id: string;
  name: string; // Column identifier
  header: string; // Column label
  getValue: (
    row: T,
  ) => (string & {}) | ValueOf<T> | undefined | number | Date | null; // Maybe we can change this to string | undefined as well TODO:
  defaultValue?: ValueOf<T>;
  size?: ColumnSize;
  setValue?: (row: T, value: string) => T;
  validationSchema?: ZodSchema;
  editable?: boolean;
  insertable?: boolean;
  sortable?: boolean;
  hidden?: boolean;
  filterable?: boolean;
  columnType?: ColumnType;
};

export type RowDef<T> = {
  selected: boolean;
  markedFor: MarkedFor;
  dataItem: T;
};

export type ColumnSize = "SMALL" | "MEDIUM" | "LARGE";
export type MarkedFor = "DELETE" | "INSERT" | "UPDATE" | "READ";
