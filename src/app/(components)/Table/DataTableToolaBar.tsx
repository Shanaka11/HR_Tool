import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAtom, useAtomValue, useSetAtom, useStore } from "jotai";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import React from "react";

import LinearLoader from "../LinearLoader";
import {
  allowCancelMarkAtom,
  allowMarkDeleteAtom,
  allowSaveRowAtom,
  cancleRowMarkAtom,
  changedDataAtom,
  createRowsAtom,
  deleteRowsAtom,
  isTableLoadingAtom,
  markCreateRowAtom,
  markDeleteRowAtom,
  markUpdateRowAtom,
  resetOriginalRowsAtom,
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
  const [isTableLoading, setIsTableLoading] = useAtom(isTableLoadingAtom, {
    store,
  });
  const resetOriginalRows = useSetAtom(resetOriginalRowsAtom, { store });

  const { toast } = useToast();

  const handleSave = async () => {
    if (changedData.tableState === "CREATE") {
      try {
        setIsTableLoading(true);
        const createdData = await handleCreate(changedData.rows as T[]);
        addCreatedRows(createdData);
        toast({
          title: "Created successfully",
        });
        resetOriginalRows();
        setIsTableLoading(false);
        return;
      } catch (e) {
        handleCrudError(e);
      }
    }

    if (changedData.tableState === "DELETE") {
      try {
        setIsTableLoading(true);
        await handleDelete(changedData.rows as T[]);
        // Remove deleted data
        removeDeletedRows();
        toast({
          title: "Deleted successfully",
        });
        resetOriginalRows();
        setIsTableLoading(false);
        return;
      } catch (e: unknown) {
        handleCrudError(e);
      }
    }

    if (changedData.tableState === "UPDATE") {
      try {
        setIsTableLoading(true);
        await handleUpdate(changedData.rows as T[]);
        addUpdatedRows();
        toast({
          title: "Updated successfully",
        });
        resetOriginalRows();
        setIsTableLoading(false);
        return;
      } catch (e: unknown) {
        handleCrudError(e);
      }
    }
  };

  const handleCrudError = (e: unknown) => {
    setIsTableLoading(false);
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
    <div className="flex gap-1 flex-wrap">
      <Button
        variant="outline"
        size="icon"
        onClick={handleMarkCreate}
        disabled={!allowDelete || isTableLoading}
      >
        <Plus />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleMarkUpdate}
        disabled={allowDelete || isTableLoading}
      >
        <Pencil />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleMarkDelete}
        disabled={allowDelete || isTableLoading}
      >
        <Trash2 />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleSave}
        disabled={allowSave || isTableLoading}
      >
        <Save />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleCancelMark}
        disabled={allowCancel || isTableLoading}
      >
        <X />
      </Button>
      <div className="w-full basis-full">
        {isTableLoading ? (
          <LinearLoader />
        ) : (
          <div className="h-1 w-full bg-white"></div>
        )}
      </div>
    </div>
  );
};

export default DataTableToolaBar;
