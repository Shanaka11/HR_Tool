import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAtomValue, useSetAtom, useStore } from "jotai";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import React from "react";

import {
  allowCancelMarkAtom,
  allowMarkDeleteAtom,
  allowSaveRowAtom,
  cancleRowMarkAtom,
  changedDataAtom,
  createRowsAtom,
  deleteRowsAtom,
  markCreateRowAtom,
  markDeleteRowAtom,
  markUpdateRowAtom,
  updateRowsAtom,
} from "./DataTableStore";

type DataTableToolaBarProps<T> = {
  handleDelete: (dataToBeDeleted: T[]) => Promise<void>;
  handleUpdate: (dataToBeUpdated: T[]) => Promise<void>;
  handleCreate: (dataToBeCreated: T[]) => Promise<T[]>;
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
  const removeDeletedRows = useSetAtom(deleteRowsAtom, { store });
  const addCreatedRows = useSetAtom(createRowsAtom, { store });
  const addUpdatedRows = useSetAtom(updateRowsAtom, { store });

  const { toast } = useToast();

  const handleSave = async () => {
    if (changedData.tableState === "CREATE") {
      try {
        const createdData = await handleCreate(changedData.rows as T[]);
        addCreatedRows(createdData);
        toast({
          title: "Created successfully",
        });
        return;
      } catch (e) {
        handleCrudError(e);
      }
    }

    if (changedData.tableState === "DELETE") {
      try {
        await handleDelete(changedData.rows as T[]);
        // Remove deleted data
        removeDeletedRows();
        toast({
          title: "Deleted successfully",
        });
        return;
      } catch (e: unknown) {
        handleCrudError(e);
      }
    }

    if (changedData.tableState === "UPDATE") {
      try {
        await handleUpdate(changedData.rows as T[]);
        addUpdatedRows();
        toast({
          title: "Updated successfully",
        });
        return;
      } catch (e: unknown) {
        handleCrudError(e);
      }
    }
  };

  const handleCrudError = (e: unknown) => {
    if (e instanceof Error) {
      toast({
        variant: "destructive",
        title: "Delete unsuccessfull",
        description: `${e.message}`,
      });
      return;
    }
    // Show error as a toast message
    toast({
      title: "Delete unsuccessfull",
      description: `There was an error`,
    });
    throw e;
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
