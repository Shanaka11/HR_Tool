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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
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
            <TableHead key={header.id}>{header.header}</TableHead>
          ))}
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
