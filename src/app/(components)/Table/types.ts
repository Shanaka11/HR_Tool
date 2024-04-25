import { ValueOf } from "@/lib/valueOf";
import { nullable, ZodSchema } from "zod";

export type ColumnType = "TEXT" | "NUMBER" | "DATE" | "BOOLEAN";
export type ColPermission =
  | "READONLY"
  | "INSERTONLY"
  | "UPDATEONLY"
  | "UPSERTONLY";

export type ColumnDef<T> =
  | ({ columnPermission: "READONLY" } & BaseColDef<T>)
  | (BaseColDef<T> & EditableColDef<T>);

type BaseColDef<T> = {
  name: string; // Column identifier
  id: string;
  header: string; // Column label
  getValue: (
    row: T,
  ) => (string & {}) | ValueOf<T> | undefined | number | Date | null; // Maybe we can change this to string | undefined as well TODO:
  size?: ColumnSize;
  sortable?: boolean;
  hidden?: boolean;
  filterable?: boolean;
  columnType?: ColumnType;
  columnPermission: ColPermission;
  mandatory?: boolean;
};

type EditableColDef<T> = {
  columnPermission: ColPermission;
  setValue: (row: T, value: string) => T;
  validationSchema: ZodSchema;
  defaultValue?: ValueOf<T>;
};

export type RowDef<T> = {
  selected: boolean;
  markedFor: MarkedFor;
  dataItem: T;
};

export type ColumnSize = "SMALL" | "MEDIUM" | "LARGE";
export type MarkedFor = "DELETE" | "INSERT" | "UPDATE" | "READ";
