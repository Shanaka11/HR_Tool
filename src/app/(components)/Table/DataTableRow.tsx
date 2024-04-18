import { TableCell, TableRow } from "@/components/ui/table";

import { PrimitiveAtom, useAtom } from "jotai";
import React from "react";
import { BaseDataItem } from "./DataTable";
import { ColumnDef, RowDef } from "./types";
import { Checkbox } from "@/components/ui/checkbox";

type DataTableRowProps<T extends BaseDataItem> = {
  rowAtom: PrimitiveAtom<RowDef<T>>;
  columns: ColumnDef<T>[];
};

const DataTableRow = <T extends BaseDataItem>({
  rowAtom,
  columns,
}: DataTableRowProps<T>) => {
  const [row, setRow] = useAtom(rowAtom);

  const handleRowSelectOnClick = () => {
    setRow((prevRow) => {
      return {
        ...prevRow,
        selected: !prevRow.selected,
      };
    });
  };

  return (
    <TableRow key={row.dataItem.id}>
      <TableCell>
        <Checkbox
          className="block"
          //   onClick={(event) => selectRow(rowIndex, event.shiftKey)}
          onClick={handleRowSelectOnClick}
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
