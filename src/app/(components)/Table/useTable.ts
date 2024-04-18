import { useMemo } from "react";
import { ColumnDef } from "./types";

type TableOptions<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

export const useTable = <T>({ columns, data }: TableOptions<T>) => {
  const rows = useMemo(() => {
    // For now we will just get data, later we can add states such as marked for, and selected
    return data;
  }, [data]);

  const getHeaders = () => {
    return columns
      .filter((column) => !column.hidden)
      .map((column) => {
        return {
          id: column.id,
          header: column.header,
        };
      });
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
    getHeaders,
    getRows,
    getCellReadValue,
  };
};
