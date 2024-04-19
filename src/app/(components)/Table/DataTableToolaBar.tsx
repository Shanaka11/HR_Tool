import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom, useStore } from "jotai";
import { Save, Trash2, X } from "lucide-react";
import React from "react";
import {
  allowCancelMarkAtom,
  allowMarkDeleteAtom,
  cancleRowMarkAtom,
  markDeleteRowAtom,
} from "./DataTableStore";
import { BaseDataItem } from "./DataTable";

type DataTableToolaBarProps = {
  handleSave: () => void;
};

const DataTableToolaBar = ({ handleSave }: DataTableToolaBarProps) => {
  const store = useStore();
  const handleMarkDelete = useSetAtom(markDeleteRowAtom, { store });
  const handleCancelMark = useSetAtom(cancleRowMarkAtom, { store });
  const allowDelete = useAtomValue(allowMarkDeleteAtom);
  const allowCancel = useAtomValue(allowCancelMarkAtom);

  return (
    <div className="flex gap-1">
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
        disabled={allowCancel}
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
