import { ValueOf } from "@/lib/valueOf";
import {
  nullable,
  ZodBoolean,
  ZodDate,
  ZodNumber,
  ZodSchema,
  ZodString,
} from "zod";

export type ColumnType = "TEXT" | "NUMBER" | "DATE" | "BOOLEAN";
export type ColPermission =
  | "READONLY"
  | "INSERTONLY"
  | "UPDATEONLY"
  | "UPSERTONLY";

export type ColumnDef<T> =
  | ({ columnPermission: "READONLY" } & BaseColDef<T>)
  | (BaseColDef<T> & (StringCol<T> | NumberCol<T> | DateCol<T> | BoolCol<T>));

type BaseColDef<T> = {
  name: string; // Column identifier
  id: string;
  header: string; // Column label
  getValue: (row: T) => string | undefined; // Maybe we can change this to string | undefined as well TODO:
  size?: ColumnSize;
  sortable?: boolean;
  hidden?: boolean;
  filterable?: boolean;
  columnType: ColumnType;
  columnPermission: ColPermission;
  mandatory?: boolean;
};

type EditableColDef<T> = {
  // setValue: (row: T, value: string) => T;
  validationSchema: ZodSchema;
  // defaultValue?: ValueOf<T>;
};

type StringCol<T> = {
  columnType: "TEXT";
  setValue: (row: T, value?: string) => T;
  defaultValue?: string;
  validationSchema: ZodString;
};

type NumberCol<T> = {
  columnType: "NUMBER";
  setValue: (row: T, value?: number) => T;
  defaultValue?: number;
  validationSchema: ZodNumber;
};

type DateCol<T> = {
  columnType: "DATE";
  setValue: (row: T, value?: Date) => T;
  defaultValue?: Date;
  validationSchema: ZodDate;
};

type BoolCol<T> = {
  columnType: "BOOLEAN";
  setValue: (row: T, value?: boolean) => T;
  defaultValue?: boolean;
  validationSchema: ZodBoolean;
};

export type RowDef<T> = {
  selected: boolean;
  markedFor: MarkedFor;
  dataItem: T;
};

export type ColumnSize = "SMALL" | "MEDIUM" | "LARGE";
export type MarkedFor = "DELETE" | "INSERT" | "UPDATE" | "READ";
