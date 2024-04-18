import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { ColumnDef, ColumnSize } from "./types";
import { useTable } from "./useTable";
import { Checkbox } from "@/components/ui/checkbox";

type BaseDataItem = {
  id: string;
};

type DataTableProps<T extends BaseDataItem> = {
  data: T[];
  columnDefinition: ColumnDef<T>[];
};

const DataTable = <T extends BaseDataItem>({
  data,
  columnDefinition,
}: DataTableProps<T>) => {
  const table = useTable({
    data,
    columns: columnDefinition,
  });

  const getColWidth = (size?: ColumnSize) => {
    if (size === "LARGE") return "w-64";
    if (size === "MEDIUM") return "w-40";
    if (size === "SMALL") return "w-20";
    return "w-auto min-w-40";
  };

  return (
    <Table className="border-collapse table-fixed min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead scope="row" className="w-8">
            <Checkbox
              className="block"
              //   onClick={(event) => selectRow(rowIndex, event.shiftKey)}
              //   checked={
              //     rows.filter((row, index) => index === rowIndex && row.isSelected)
              //       .length > 0
              //   }
              //   disabled={tableState === "NEW"}
            />
          </TableHead>
          {table.getHeaders().map((header) => (
            <TableHead
              scope="col"
              key={header.id}
              className={`${getColWidth(header.size)}`}
            >
              {header.header}
            </TableHead>
          ))}
          <TableHead className="w-auto"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.getRows().map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Checkbox
                className="block"
                //   onClick={(event) => selectRow(rowIndex, event.shiftKey)}
                //   checked={
                //     rows.filter((row, index) => index === rowIndex && row.isSelected)
                //       .length > 0
                //   }
                //   disabled={tableState === "NEW"}
              />
            </TableCell>
            {table.getHeaders().map((column) => (
              <TableCell key={`${row.id}-${column.header}`}>
                {table.getCellReadValue(row, column.id)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
