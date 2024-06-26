import {
  ZodBoolean,
  ZodDate,
  ZodNumber,
  ZodOptional,
  ZodSchema,
  ZodString,
} from "zod";

export type ColumnType =
  | "TEXT"
  | "NUMBER"
  | "DATE"
  | "BOOLEAN"
  | "ENUM"
  | "LOV";

export type ColPermission =
  | "READONLY"
  | "INSERTONLY"
  | "UPDATEONLY"
  | "UPSERTONLY";

export type ColumnDef<T> =
  | ({ columnPermission: "READONLY" } & BaseColDef<T>)
  | (BaseColDef<T> &
      (
        | StringCol<T>
        | NumberCol<T>
        | DateCol<T>
        | BoolCol<T>
        | EnumCol<T>
        | ForeignKeyCol<T>
      ));

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
  isForeignKey?: boolean;
};

type StringCol<T> = {
  columnType: "TEXT";
  setValue: (row: T, value?: string) => T;
  defaultValue?: string;
  validationSchema: ZodString | ZodOptional<ZodString>;
  required?: boolean;
};

type NumberCol<T> = {
  columnType: "NUMBER";
  setValue: (row: T, value?: number) => T;
  defaultValue?: number;
  validationSchema: ZodNumber | ZodOptional<ZodNumber>;
  required?: boolean;
};

type DateCol<T> = {
  columnType: "DATE";
  setValue: (row: T, value?: Date) => T;
  defaultValue?: Date;
  validationSchema: ZodDate | ZodOptional<ZodDate>;
  required?: boolean;
};

type BoolCol<T> = {
  columnType: "BOOLEAN";
  setValue: (row: T, value?: boolean) => T;
  defaultValue?: boolean;
  validationSchema: ZodBoolean;
  required?: boolean;
};

type EnumCol<T> = {
  columnType: "ENUM";
  setValue: (row: T, value?: string) => T;
  defaultValue?: string;
  validationSchema: ZodSchema;
  enumValues: string[];
  required?: boolean;
};

type ForeignKeyCol<T> = {
  columnType: "LOV";
  setValue: (row: T, value?: any) => T;
  getLovOptions: (row: T, searchString?: string) => Promise<Lov[]>;
  validationSchema: ZodSchema;
  defaultValue?: string;
  required?: boolean;
};

export type Lov = {
  id: string;
  displayName: string;
  displayItem?: Record<string, string>;
  item: any;
};

export type RowDef<T> = {
  selected: boolean;
  markedFor: MarkedFor;
  dataItem: T;
};

export type ColumnSize = "SMALL" | "MEDIUM" | "LARGE";
export type MarkedFor = "DELETE" | "INSERT" | "UPDATE" | "READ";
