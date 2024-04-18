"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useRef } from "react";
import { ColumnDef, ColumnSize, RowDef } from "./types";
import { useTable } from "./useTable";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableRow from "./DataTableRow";
import { PrimitiveAtom, Provider, atom, useAtom, useStore } from "jotai";
import { rowAtoms, rowsAtom } from "./DataTableStore";

export type BaseDataItem = {
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
  const store = useStore();
  const loaded = useRef(false);

  if (!loaded.current) {
    store.set(
      rowsAtom,
      data.map((dataItem) => {
        return {
          selected: false,
          markedFor: "READ" as const,
          dataItem: dataItem,
        };
      })
    );
    loaded.current = true;
  }
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

  const [rowAtom] = useAtom(rowAtoms, { store: useStore() });

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
          {table.getPublicHeaders().map((header) => (
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
        {rowAtom.map((rowAtom) => (
          <DataTableRow
            rowAtom={rowAtom as PrimitiveAtom<RowDef<T>>}
            key={rowAtom.toString()}
            columns={table.getPublicHeaders()}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
