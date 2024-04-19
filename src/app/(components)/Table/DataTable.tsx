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
import {
  PrimitiveAtom,
  useAtom,
  useAtomValue,
  useSetAtom,
  useStore,
} from "jotai";
import {
  allRowsSelectedAtom,
  loadRowsAtom,
  rowAtoms,
  selectAllAtom,
} from "./DataTableStore";

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
  const [, loadRows] = useAtom(loadRowsAtom, {
    store: store,
  });

  if (!loaded.current) {
    loadRows(data);
    loaded.current = true;
  }
  const table = useTable({
    data,
    columns: columnDefinition,
  });

  const allSelected = useAtomValue(allRowsSelectedAtom, {
    store: store,
  });

  const [rowAtom] = useAtom(rowAtoms, { store: useStore() });
  const handleSelectAllClick = useSetAtom(selectAllAtom, { store: store });

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
              onClick={handleSelectAllClick}
              checked={allSelected}
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
        {rowAtom.map((rowAtom, index) => (
          <DataTableRow
            rowAtom={rowAtom as PrimitiveAtom<RowDef<T>>}
            key={rowAtom.toString()}
            columns={table.getPublicHeaders()}
            index={index}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
