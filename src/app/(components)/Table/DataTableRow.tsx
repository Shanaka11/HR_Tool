import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  PrimitiveAtom,
  useAtom,
  useAtomValue,
  useSetAtom,
  useStore,
} from "jotai";
import React from "react";
import { ZodSchema } from "zod";

import { BaseDataItem } from "./DataTable";
import DataTableEditableCell from "./DataTableEditableCell";
import { colsAtom, selectRowAtom, tableStateAtom } from "./DataTableStore";
import { RowDef } from "./types";

type DataTableRowProps<T extends BaseDataItem> = {
  rowAtom: PrimitiveAtom<RowDef<T>>;
  index: number;
};

const DataTableRow = <T extends BaseDataItem>({
  rowAtom,
  index,
}: DataTableRowProps<T>) => {
  const store = useStore();
  const [row, setRow] = useAtom(rowAtom, {
    store,
  });
  const handleRowSelect = useSetAtom(selectRowAtom, {
    store,
  });

  const columns = useAtomValue(colsAtom, { store });
  const tableState = useAtomValue(tableStateAtom, { store });

  const handleRowSelectOnClick = (holdShift: boolean) => {
    handleRowSelect(rowAtom, holdShift, index);
  };

  const updateRow = (row: T) => {
    setRow((prev) => {
      return {
        ...prev,
        dataItem: row,
      };
    });
  };

  if (row.markedFor === "UPDATE" || row.markedFor === "INSERT") {
    return (
      <TableRow>
        <TableCell>
          <Checkbox className="block" checked={row.selected} disabled={true} />
        </TableCell>
        {columns.map((column) => (
          <DataTableEditableCell
            updateRow={updateRow}
            key={`${row.dataItem.id}-${column.header}`}
            column={column}
            row={row}
          />
        ))}
      </TableRow>
    );
  }
  return (
    <TableRow
      key={row.dataItem.id}
      className={row.markedFor === "DELETE" ? "line-through" : ""}
    >
      <TableCell>
        <Checkbox
          className="block"
          onClick={(event) => handleRowSelectOnClick(event.shiftKey)}
          checked={row.selected}
          disabled={tableState !== "READ"}
        />
      </TableCell>
      {columns.map((column) => (
        <TableCell key={`${row.dataItem.id}-${column.header}`}>
          {column.getValue(row.dataItem) as string}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default DataTableRow;
