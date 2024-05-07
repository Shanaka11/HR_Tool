import { TableCell } from "@/components/ui/table";
import { useAtomValue, useSetAtom, useStore } from "jotai";
import React, { useState } from "react";

import { isTableLoadingAtom, isTableValidAtom } from "./DataTableStore";
import BooleanInput from "./EditableCells/BooleanInput";
import DateInput from "./EditableCells/DateInput";
import EnumInput from "./EditableCells/EnumInput";
import LovInput from "./EditableCells/LovInput";
import Number from "./EditableCells/Number";
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
    if (column.columnPermission === "READONLY") return;

    let parsedValue: any = value;

    if (column.columnType === "DATE") {
      parsedValue = new Date(value);
    }
    if (column.columnType === "NUMBER") {
      parsedValue = +value;
    }
    if (column.columnType === "BOOLEAN") {
      parsedValue = value === "true";
    }
    if (column.columnType === "ENUM") {
      parsedValue = value === "" ? undefined : value;
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

    setError("");
    setIsTableValid(true);

    if (column.columnType === "ENUM") {
      updateRow(
        column.setValue(
          row.dataItem,
          validationResult.data === ""
            ? undefined
            : (validationResult.data as string | undefined),
        ),
      );
    }

    if (column.columnType === "TEXT") {
      updateRow(
        column.setValue(
          row.dataItem,
          validationResult.data as string | undefined,
        ),
      );
    }
    if (column.columnType === "NUMBER") {
      updateRow(
        column.setValue(
          row.dataItem,
          validationResult.data as number | undefined,
        ),
      );
    }
    if (column.columnType === "BOOLEAN") {
      updateRow(
        column.setValue(
          row.dataItem,
          validationResult.data as boolean | undefined,
        ),
      );
    }
    if (column.columnType === "DATE") {
      updateRow(
        column.setValue(
          row.dataItem,
          validationResult.data as Date | undefined,
        ),
      );
    }
    if (column.columnType === "ENUM") {
      updateRow(column.setValue(row.dataItem, validationResult.data));
    }
  };

  const handleLovUpdate = (item: any) => {
    if (item === undefined) throw new Error("Item is null");

    if (column.columnType !== "LOV")
      throw new Error("handleLovUpdate is used in a non lov column");
    if (column.columnPermission === "READONLY")
      throw new Error("handleLovUpdate is used in a read only col");

    updateRow(column.setValue(row.dataItem, item));
  };

  if (column.columnPermission === "READONLY") {
    return (
      <div
        className={`w-full h-12  rounded-none focus:ring-0 focus-visible:ring-0 border-t-0 border-b-0 border-r border-l-0 focus:border focus:border-primary ${isFirstCellofRow ? "border-l" : ""} align-middle grid items-center p-4`}
      >
        {column.getValue(row.dataItem)}
      </div>
    );
  }

  if (column.columnType === "LOV") {
    return (
      <LovInput
        row={row}
        getLovOptions={column.getLovOptions}
        handleOnBlur={handleLovUpdate}
        firstCell={isFirstCellofRow}
        colName={column.name}
        defaultValue={column.getValue(row.dataItem) as string}
      />
    );
  }

  if (column.columnType === "ENUM") {
    return (
      <EnumInput
        disabled={isTableLoading}
        handleOnBlur={handleValueUpdate}
        defaultValue={column.getValue(row.dataItem) as string}
        options={column.enumValues}
        firstCell={isFirstCellofRow}
        error={error}
      />
    );
  }

  if (column.columnType === "BOOLEAN") {
    return (
      <BooleanInput
        defaultValue={column.getValue(row.dataItem) as string}
        handleOnBlur={handleValueUpdate}
        disabled={isTableLoading}
        error={error}
        firstCell={isFirstCellofRow}
      />
    );
  }
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
  if (column.columnType === "TEXT") {
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
