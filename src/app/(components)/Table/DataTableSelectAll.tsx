import { Checkbox } from "@/components/ui/checkbox";
import { useAtomValue, useSetAtom, useStore } from "jotai";
import React from "react";

import {
  allRowsSelectedAtom,
  selectAllAtom,
  tableStateAtom,
} from "./DataTableStore";

const DataTableSelectAll = () => {
  const store = useStore();
  const handleSelectAllClick = useSetAtom(selectAllAtom, { store });
  const allSelected = useAtomValue(allRowsSelectedAtom, {
    store,
  });
  const tableState = useAtomValue(tableStateAtom, { store });
  return (
    <Checkbox
      className="block"
      onClick={handleSelectAllClick}
      checked={allSelected}
      disabled={tableState !== "READ"}
    />
  );
};

export default DataTableSelectAll;
