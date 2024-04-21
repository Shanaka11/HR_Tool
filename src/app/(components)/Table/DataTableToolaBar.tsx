import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom, useStore } from "jotai";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import React from "react";

import {
  allowCancelMarkAtom,
  allowMarkDeleteAtom,
  allowSaveRowAtom,
  cancleRowMarkAtom,
  changedDataAtom,
  markCreateRowAtom,
  markDeleteRowAtom,
  markUpdateRowAtom,
} from "./DataTableStore";

type DataTableToolaBarProps<T> = {
  handleDelete: (dataToBeDeleted: T[]) => void;
  handleUpdate: (dataToBeUpdated: T[]) => void;
  handleCreate: (dataToBeCreated: T[]) => void;
};

const DataTableToolaBar = <T,>({
  handleCreate,
  handleDelete,
  handleUpdate,
}: DataTableToolaBarProps<T>) => {
  const store = useStore();
  const changedData = useAtomValue(changedDataAtom, { store });
  const handleMarkDelete = useSetAtom(markDeleteRowAtom, { store });
  const handleCancelMark = useSetAtom(cancleRowMarkAtom, { store });
  const handleMarkUpdate = useSetAtom(markUpdateRowAtom, { store });
  const handleMarkCreate = useSetAtom(markCreateRowAtom, { store });
  const allowDelete = useAtomValue(allowMarkDeleteAtom, { store });
  const allowCancel = useAtomValue(allowCancelMarkAtom, { store });
  const allowSave = useAtomValue(allowSaveRowAtom, { store });

  const handleSave = () => {
    if (changedData.tableState === "CREATE") {
      handleCreate(changedData.rows as T[]);
      return;
    }

    if (changedData.tableState === "DELETE") {
      handleDelete(changedData.rows as T[]);
      return;
    }

    if (changedData.tableState === "UPDATE") {
      handleUpdate(changedData.rows as T[]);
      return;
    }
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={handleMarkCreate}
        disabled={!allowDelete}
      >
        <Plus />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleMarkUpdate}
        disabled={allowDelete}
      >
        <Pencil />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleMarkDelete}
        disabled={allowDelete}
      >
        <Trash2 />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleSave}
        disabled={allowSave}
      >
        <Save />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleCancelMark}
        disabled={allowCancel}
      >
        <X />
      </Button>
    </div>
  );
};

export default DataTableToolaBar;
