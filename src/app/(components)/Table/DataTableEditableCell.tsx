import { TableCell } from "@/components/ui/table";
import { PrimitiveAtom, useAtom, useSetAtom } from "jotai";
import React, { useState } from "react";

import { isTableValidAtom } from "./DataTableStore";
import { ColumnDef, RowDef } from "./types";

type DataTableEditableCellProps<T> = {
  row: RowDef<T>;
  column: ColumnDef<T>;
  updateRow: (value: T) => void;
};
const DataTableEditableCell = <T,>({
  row,
  column,
  updateRow,
}: DataTableEditableCellProps<T>) => {
  const [error, setError] = useState("");
  const setIsTableValid = useSetAtom(isTableValidAtom);

  const handleValueUpdate = (
    value: string,
    // updateFunction?: (row: any, value: string | number | symbol) => any,
    // validationSchema?: ZodSchema
  ) => {
    // Do field validation here as well, use zod schema validation and define the schema in the column def, if there is a validation error, show it in the relevent cell
    if (column.validationSchema !== undefined) {
      const validationResult = column.validationSchema.safeParse(value);
      if (!validationResult.success) {
        if (validationResult.error.formErrors.formErrors.length > 0) {
          setError(validationResult.error.formErrors.formErrors[0]);
          setIsTableValid(false);
          return;
        }
        setIsTableValid(false);
        console.log(validationResult);
        throw new Error("Validation Error");
      }
    }
    if (column.setValue === undefined)
      throw new Error("setValue function undefined in the column defintion");

    setError("");
    setIsTableValid(true);
    updateRow(column.setValue(row.dataItem, value as keyof T));
  };

  return (
    <TableCell>
      {/* Dependint on the column type show the correct input type */}
      <input
        defaultValue={column.getValue(row.dataItem) as string}
        className="border"
        onBlur={(event) => handleValueUpdate(event.target.value)}
      />
      {error !== "" && <p>{error}</p>}
    </TableCell>
  );
};

export default DataTableEditableCell;
