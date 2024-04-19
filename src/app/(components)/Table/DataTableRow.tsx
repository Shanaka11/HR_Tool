import { TableCell, TableRow } from "@/components/ui/table";

import { PrimitiveAtom, useAtomValue, useSetAtom, useStore } from "jotai";
import React from "react";
import { BaseDataItem } from "./DataTable";
import { RowDef } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import { colsAtom, selectRowAtom } from "./DataTableStore";

type DataTableRowProps<T extends BaseDataItem> = {
  rowAtom: PrimitiveAtom<RowDef<T>>;
  index: number;
};

const DataTableRow = <T extends BaseDataItem>({
  rowAtom,
  index,
}: DataTableRowProps<T>) => {
  const store = useStore();
  const row = useAtomValue(rowAtom, {
    store,
  });
  const handleRowSelect = useSetAtom(selectRowAtom, {
    store,
  });

  const columns = useAtomValue(colsAtom);

  const handleRowSelectOnClick = (holdShift: boolean) => {
    handleRowSelect(rowAtom, holdShift, index);
  };

  return (
    <TableRow key={row.dataItem.id}>
      <TableCell>
        <Checkbox
          className="block"
          onClick={(event) => handleRowSelectOnClick(event.shiftKey)}
          checked={row.selected}
          //   checked={
          //     rows.filter((row, index) => index === rowIndex && row.isSelected)
          //       .length > 0
          //   }
          //   disabled={tableState === "NEW"}
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
