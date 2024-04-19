import { Button } from "@/components/ui/button";
import { useSetAtom, useStore } from "jotai";
import { Save, Trash2, X } from "lucide-react";
import React from "react";
import { cancleRowMarkAtom, markDeleteRowAtom } from "./DataTableStore";
import { BaseDataItem } from "./DataTable";

type DataTableToolaBarProps = {
  handleSave: () => void;
};

const DataTableToolaBar = ({ handleSave }: DataTableToolaBarProps) => {
  const store = useStore();
  const handleMarkDelete = useSetAtom(markDeleteRowAtom, { store });
  const handleCancelMark = useSetAtom(cancleRowMarkAtom, { store });

  return (
    <div className="flex gap-1">
      <Button variant="outline" size="icon" onClick={handleMarkDelete}>
        <Trash2 />
      </Button>
      <Button variant="outline" size="icon" onClick={handleSave}>
        <Save />
      </Button>
      <Button variant="outline" size="icon" onClick={handleCancelMark}>
        <X />
      </Button>
    </div>
  );
};

export default DataTableToolaBar;
