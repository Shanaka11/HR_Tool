"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { ColumnDef, Lov, RowDef } from "../types";
import LovItem from "./LovItem";

type LovInputProps<T> = {
  row: RowDef<T>;
  getLovOptions: (row: T, searchString?: string) => Promise<Lov[]>;
  firstCell?: boolean;
};

const LovInput = <T,>({ row, getLovOptions, firstCell }: LovInputProps<T>) => {
  const [value, setValue] = useState("" ?? null);

  // TODO: When getting the lov options only get the first 15 or so options and if there are more then show a find button, that will open a dialog with a detailed lov
  const { data, isLoading, error } = useQuery({
    queryKey: ["projectOwners"],
    queryFn: () => getLovOptions(row.dataItem),
  });

  //   if (isLoading) {
  //     return <div>loading..</div>;
  //   }

  //   if (data == undefined || error) {
  //     return null;
  //   }

  return (
    <Select

    //   value={value === null || value === undefined ? undefined : value}
    // onValueChange={handleValueOnChange}
    // disabled={disabled}
    >
      <SelectTrigger
        className={`w-full h-12 rounded-none focus:ring-0 focus-visible:ring-0 border-t-0 border-b-0 border-r border-l-0 focus:border focus:border-primary ${firstCell ? "border-l" : ""}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {/* {!required && <SelectItem value="null" className="h-9"></SelectItem>} */}
        {data?.map((option) => (
          <SelectItem key={option.id} value={option.item} className="group">
            <LovItem dataItem={option.displayItem} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LovInput;
