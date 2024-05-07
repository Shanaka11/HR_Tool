import { Switch } from "@/components/ui/switch";
import React from "react";

type BooleanCellProps = {
  value?: boolean;
};

const BooleanCell = ({ value }: BooleanCellProps) => {
  return <Switch checked={value} />;
};

export default BooleanCell;
