import { useAtomValue, useSetAtom, useStore } from "jotai";
import React, { useState } from "react";

import { isTableLoadingAtom, isTableValidAtom } from "./DataTableStore";
import DateInput from "./EditableCells/DateInput";
import Number from "./EditableCells/Number";
import Text from "./EditableCells/Text";
import { ColumnDef, RowDef } from "./types";

type DataTableEditableCellProps<T> = {
  row: RowDef<T>;
  column: ColumnDef<T>;
  updateRow: (value: T) => void;
  isFirstCellofRow?: boolean;
};

type InputProps = {
  defaultValue: number;
  handleOnBlur: (value: number) => void;
  disabled: boolean;
  error?: string;
  required?: boolean;
  firstCell?: boolean;
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
      let parsedValue: any = value;
      if (column.columnType === "DATE") {
        parsedValue = new Date(value);
      }
      if (column.columnType === "NUMBER") {
        parsedValue = +value;
      }
      const validationResult = column.validationSchema.safeParse(parsedValue);

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
    updateRow(column.setValue(row.dataItem, value));
  };

  if (column.columnType === "DATE") {
    return (
      <DateInput
        defaultValue={column.getValue(row.dataItem) as string}
        handleOnBlur={handleValueUpdate}
        disabled={isTableLoading}
        error={error}
        firstCell={isFirstCellofRow}
      />
    );
  }

  if (column.columnType === "NUMBER") {
    return (
      <Number
        defaultValue={column.getValue(row.dataItem) as string}
        handleOnBlur={handleValueUpdate}
        disabled={isTableLoading}
        error={error}
        required={false}
        firstCell={isFirstCellofRow}
      />
    );
  }
  if (column.columnType === "TEXT" || column.columnType === undefined) {
    return (
      <Text
        defaultValue={column.getValue(row.dataItem) as string}
        handleOnBlur={handleValueUpdate}
        disabled={isTableLoading}
        error={error}
        required={false}
        firstCell={isFirstCellofRow}
      />
    );
  }
};

export default DataTableEditableCell;
