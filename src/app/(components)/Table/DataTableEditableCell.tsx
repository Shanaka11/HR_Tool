import { TableCell } from "@/components/ui/table";
import {
  PrimitiveAtom,
  useAtom,
  useAtomValue,
  useSetAtom,
  useStore,
} from "jotai";
import React, { useState } from "react";

import { isTableLoadingAtom, isTableValidAtom } from "./DataTableStore";
import Text from "./EditableCells/Text";
import { ColumnDef, RowDef } from "./types";

type DataTableEditableCellProps<T> = {
  row: RowDef<T>;
  column: ColumnDef<T>;
  updateRow: (value: T) => void;
  isFirstCellofRow?: boolean;
};
const DataTableEditableCell = <T,>({
  row,
  column,
  updateRow,
  isFirstCellofRow,
}: DataTableEditableCellProps<T>) => {
  const [error, setError] = useState("");
  const store = useStore();
  const setIsTableValid = useSetAtom(isTableValidAtom, { store });
  const isTableLoading = useAtomValue(isTableLoadingAtom, {
    store,
  });
  const handleValueUpdate = (value: string) => {
    // Do field validation here as well, use zod schema validation and define the schema in the column def, if there is a validation error, show it in the relevent cell
    if (column.validationSchema !== undefined) {
      const validationResult = column.validationSchema.safeParse(value);
      console.log(value, validationResult);
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
    <TableCell className={`p-0 ${isFirstCellofRow ? `pl-4` : ""} relative`}>
      {/* Dependint on the column type show the correct input type */}
      <Text
        defaultValue={column.getValue(row.dataItem) as string}
        handleOnBlur={handleValueUpdate}
        disabled={isTableLoading}
        error={error}
        required={false}
        firstCell={isFirstCellofRow}
      />
      {/* <input
        defaultValue={column.getValue(row.dataItem) as string}
        className="border"
        onBlur={(event) => handleValueUpdate(event.target.value)}
        disabled={isTableLoading}
      /> */}
      {/* {error !== "" && <p>{error}</p>} */}
    </TableCell>
  );
};

export default DataTableEditableCell;
