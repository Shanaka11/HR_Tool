"use client";

import { Table, TableBody } from "@/components/ui/table";
import { PrimitiveAtom, useAtom, useSetAtom, useStore } from "jotai";
import React, { useRef } from "react";

import DataTableHeader from "./DataTableHeader";
import DataTableRow from "./DataTableRow";
import {
  loadColsAtom,
  loadRowsAtom,
  newRowAtoms,
  rowAtoms,
} from "./DataTableStore";
import DataTableToolaBar from "./DataTableToolaBar";
import { ColumnDef, RowDef } from "./types";

export type BaseDataItem = {
  id: string;
};

type DataTableProps<T extends BaseDataItem> = {
  data: T[];
  columnDefinition: ColumnDef<T>[];
  handleDelete: (dataToBeDeleted: T[]) => void;
  handleUpdate: (dataToBeUpdated: T[]) => void;
  handleCreate: (dataToBeCreated: T[]) => void;
};

const DataTable = <T extends BaseDataItem>({
  data,
  columnDefinition,
  handleDelete,
  handleUpdate,
  handleCreate,
}: DataTableProps<T>) => {
  const store = useStore();
  const loaded = useRef(false);

  const loadRows = useSetAtom(loadRowsAtom, {
    store: store,
  });
  const loadCols = useSetAtom(loadColsAtom, { store });

  if (!loaded.current) {
    loadCols(columnDefinition);
    loadRows(data);
    loaded.current = true;
  }

  const [rowAtom] = useAtom(rowAtoms, { store });
  const [newRowAtom] = useAtom(newRowAtoms, { store });

  return (
    <>
      {/* Table Toolbar */}
      <DataTableToolaBar
        handleCreate={handleCreate}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <Table className="border-collapse table-fixed min-w-full">
        <DataTableHeader />
        <TableBody>
          <>
            {newRowAtom.map((rowAtom, index) => (
              <DataTableRow
                rowAtom={rowAtom as PrimitiveAtom<RowDef<T>>}
                key={rowAtom.toString()}
                index={index}
              />
            ))}
          </>
          <>
            {rowAtom.map((rowAtom, index) => (
              <DataTableRow
                rowAtom={rowAtom as PrimitiveAtom<RowDef<T>>}
                key={rowAtom.toString()}
                index={index}
              />
            ))}
          </>
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
