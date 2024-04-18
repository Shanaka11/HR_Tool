import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { ColumnDef } from "./types";
import { useTable } from "./useTable";

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {table.getHeaders().map((header) => (
            <TableHead key={header.id}>{header.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.getRows().map((row) => (
          <TableRow key={row.id}>
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
