import { useMemo } from "react";
import { ColumnDef, RowDef } from "./types";
import { atom, useAtom, useAtomValue } from "jotai";
import { splitAtom } from "jotai/utils";
import { BaseDataItem } from "./DataTable";

type TableOptions<T extends BaseDataItem> = {
  data: T[];
  columns: ColumnDef<T>[];
};

export const useTable = <T extends BaseDataItem>({
  columns,
  data,
}: TableOptions<T>) => {
  const rows: RowDef<T>[] = useMemo(() => {
    // For now we will just get data, later we can add states such as marked for, and selected
    return data.map((dataItem) => {
      return {
        selected: false,
        markedFor: "READ",
        dataItem: dataItem,
      };
    });
  }, [data]);

  const getPublicHeaders = () => {
    return columns.filter((column) => !column.hidden);
  };

  const getRows = () => {
    return rows;
  };

  const getCellReadValue = (row: T, columnId: string) => {
    return columns
      .find((column) => column.id === columnId)
      ?.getValue(row) as string;
  };

  return {
    getPublicHeaders,
    getRows,
    getCellReadValue,
  };
};
