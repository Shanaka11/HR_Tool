"use client";

import { atom, Getter, PrimitiveAtom, Setter } from "jotai";
import { splitAtom } from "jotai/utils";

import { ColumnDef, RowDef } from "./types";

// Jotai
// Data Atoms
const newRowsAtom = atom<RowDef<unknown>[]>([]);
export const newRowAtoms = splitAtom(newRowsAtom);
const rowsAtom = atom<RowDef<unknown>[]>([]);
export const rowAtoms = splitAtom(rowsAtom);
const originalRowsAtom = atom<RowDef<unknown>[]>([]);
const selectedRowIndexAtom = atom<number[]>([-1]);
export const isTableValidAtom = atom<boolean>(true);
export const isTableLoadingAtom = atom<boolean>(false);

const loadRows = (set: Setter, data: unknown[]) => {
  const rowData = data.map((dataItem) => {
    return {
      selected: false,
      markedFor: "READ" as const,
      dataItem: dataItem,
    };
  });
  set(rowsAtom, rowData);
  set(originalRowsAtom, rowData);
};

const setColumnDefinitions = (set: Setter, columns: ColumnDef<any>[]) => {
  set(
    colsAtom,
    columns.filter((column) => !column.hidden),
  );
};

const allRowsSelected = (get: Getter) => {
  const rows = get(rowsAtom);

  if (rows.length === 0) return false;

  for (let i = 0; i < rows.length; i++) {
    if (!rows[i].selected) return false;
  }
  return true;
};

const handleSelectAll = (get: Getter, set: Setter) => {
  const allSelected = get(allRowsSelectedAtom);
  set(rowsAtom, (prev) => {
    return prev.map((row) => {
      return { ...row, selected: !allSelected };
    });
  });
  set(selectedRowIndexAtom, [-1]);
};

const handleRowSelect = (
  get: Getter,
  set: Setter,
  rowAtom: PrimitiveAtom<RowDef<any>>,
  holdShift: boolean,
  index: number,
) => {
  const selectedIndex = get(selectedRowIndexAtom);

  // If selectedindex[0] = -1 then ignore the shift
  // If shift is pressed
  if (holdShift && selectedIndex[0] !== -1) {
    // If current index is larger than the last index then everything between last index and the current index should be selected
    if (index > selectedIndex[0]) {
      set(rowsAtom, (prev) => {
        return prev.map((row, rowIndex) => {
          if (rowIndex <= index && rowIndex > selectedIndex[0]) {
            return { ...row, selected: true };
          }
          if (!selectedIndex.includes(rowIndex)) {
            return { ...row, selected: false };
          }
          return { ...row, selected: true };
        });
      });
      return;
    }
    // if current index is smaller than the last index then everything between current inedx nand the last index should be selected
    set(rowsAtom, (prev) => {
      return prev.map((row, rowIndex) => {
        if (rowIndex >= index && rowIndex < selectedIndex[0]) {
          return { ...row, selected: true };
        }
        if (!selectedIndex.includes(rowIndex)) {
          return { ...row, selected: false };
        }
        return { ...row, selected: true };
      });
    });
    return;
  }

  const row = get(rowAtom);
  if (!row.selected) {
    set(selectedRowIndexAtom, (prev) => [index, ...prev]);
  } else {
    set(selectedRowIndexAtom, (prev) => prev.toSpliced(0, 1));
  }

  set(rowAtom, (prev) => {
    return { ...prev, selected: !prev.selected };
  });
};

const handleMarkDelete = (get: Getter, set: Setter) => {
  const rowAtomsAtom = get(rowAtoms);
  rowAtomsAtom.forEach((rowAtom) => {
    const row = get(rowAtom);
    if (row.selected) {
      set(rowAtom, {
        ...row,
        markedFor: "DELETE",
      });
    }
  });
  set(tableStateAtom, "DELETE");
};

const handleAllowMarkDelete = (get: Getter) => {
  const tableState = get(tableStateAtom);

  if (tableState !== "READ") return true;

  const rows = get(rowsAtom);
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].selected) return false;
  }
  return true;
};

const handleMarkCancel = (get: Getter, set: Setter) => {
  const tableState = get(tableStateAtom);
  if (tableState === "CREATE") {
    set(newRowsAtom, []);
    set(tableStateAtom, "READ");
    return;
  }
  if (tableState === "UPDATE") {
    const originalRows = get(originalRowsAtom);
    set(rowsAtom, originalRows);
    set(tableStateAtom, "READ");
    return;
  }
  set(rowsAtom, (prev) => {
    return prev.map((row) => {
      return {
        ...row,
        selected: false,
        markedFor: "READ",
      };
    });
  });
  set(tableStateAtom, "READ");
  set(isTableValidAtom, true);
};

const handleAllowMarkCancel = (get: Getter) => {
  return get(tableStateAtom) === "READ";
};

const handleMarkUpdate = (get: Getter, set: Setter) => {
  const rowAtomsAtom = get(rowAtoms);
  rowAtomsAtom.forEach((rowAtom) => {
    const row = get(rowAtom);
    if (row.selected) {
      set(rowAtom, {
        ...row,
        markedFor: "UPDATE",
      });
    }
  });
  set(tableStateAtom, "UPDATE");
};

const handleMarkCreate = (get: Getter, set: Setter) => {
  const newRowDataItem: any = {};
  const columns = get(colsAtom);
  columns.forEach((column) => {
    if (column.columnPermission === "READONLY") {
      newRowDataItem[column.name] = "";
      return;
    }
    newRowDataItem[column.name] = column.defaultValue;
  });
  set(newRowsAtom, (prev) => [
    {
      markedFor: "INSERT",
      selected: false,
      dataItem: newRowDataItem,
    },
    ...prev,
  ]);
  set(tableStateAtom, "CREATE");
};

const getChangedData = (get: Getter) => {
  const tableState = get(tableStateAtom);
  if (tableState === "CREATE") {
    const rows = get(newRowsAtom);
    return {
      rows: rows
        .filter((row) => row.markedFor === "INSERT")
        .map((row) => row.dataItem),
      tableState,
    };
  }

  const rows = get(rowsAtom);
  if (tableState === "UPDATE") {
    return {
      rows: rows
        .filter((row) => row.markedFor === "UPDATE")
        .map((row) => row.dataItem),
      tableState,
    };
  }

  return {
    rows: rows
      .filter((row) => row.markedFor === "DELETE")
      .map((row) => row.dataItem),
    tableState,
  };
};

const handleAllowSave = (get: Getter) => {
  const isTableValid = get(isTableValidAtom);
  const tableState = get(tableStateAtom);

  console.log(isTableValid);
  if (isTableValid) {
    return tableState === "READ";
  }

  return true;
};

const handleDeleteRows = (get: Getter, set: Setter) => {
  const rows = get(rowsAtom).filter((row) => row.markedFor !== "DELETE");
  set(rowsAtom, rows);
  set(tableStateAtom, "READ");
};

const handleCreateRows = (get: Getter, set: Setter, createdData: unknown[]) => {
  const newRows: RowDef<unknown>[] = createdData.map((createdDataItem) => {
    return {
      selected: false,
      markedFor: "READ",
      dataItem: createdDataItem,
    };
  });
  set(rowsAtom, (prev) => [...newRows, ...prev]);
  set(newRowsAtom, []);
  set(tableStateAtom, "READ");
};

const handleUpdateRows = (get: Getter, set: Setter) => {
  const rowAtomsAtom = get(rowAtoms);
  rowAtomsAtom.forEach((rowAtom) => {
    const row = get(rowAtom);
    if (row.markedFor === "UPDATE") {
      set(rowAtom, {
        ...row,
        selected: false,
        markedFor: "READ",
      });
    }
  });
  set(tableStateAtom, "READ");
};

const handleResetOriginalRows = (get: Getter, set: Setter) => {
  const rows = get(rowsAtom);
  set(originalRowsAtom, rows);
};

// Action Atoms
// Load data to table
export const loadRowsAtom = atom(null, (get, set, data: unknown[]) => {
  loadRows(set, data);
});
// Click Select All
export const selectAllAtom = atom(null, handleSelectAll);
// Select All
export const allRowsSelectedAtom = atom(allRowsSelected);
// Shift Click
export const selectRowAtom = atom(null, handleRowSelect);

// Table state
export const tableStateAtom = atom<"CREATE" | "READ" | "UPDATE" | "DELETE">(
  "READ",
);
// Allow Mark Delete / Update
export const allowMarkDeleteAtom = atom(handleAllowMarkDelete);
// Mark Delete
export const markDeleteRowAtom = atom(null, handleMarkDelete);
// Delete Success
export const deleteRowsAtom = atom(null, handleDeleteRows);
// Allow Cancel Mark
export const allowCancelMarkAtom = atom(handleAllowMarkCancel);
// Cancle Mark
export const cancleRowMarkAtom = atom(null, handleMarkCancel);

// Mark Update
export const markUpdateRowAtom = atom(null, handleMarkUpdate);
// Update Success
export const updateRowsAtom = atom(null, handleUpdateRows);
// Mark Create
export const markCreateRowAtom = atom(null, handleMarkCreate);

// Create Success
export const createRowsAtom = atom(null, handleCreateRows);

// Allow Save
export const allowSaveRowAtom = atom(handleAllowSave);
// Save Action
export const changedDataAtom = atom(getChangedData);

// Reset Original Rows
export const resetOriginalRowsAtom = atom(null, handleResetOriginalRows);

// Column Definition
export const colsAtom = atom<ColumnDef<any>[]>([]);

export const loadColsAtom = atom(null, (get, set, columns: ColumnDef<any>[]) =>
  setColumnDefinitions(set, columns),
);
