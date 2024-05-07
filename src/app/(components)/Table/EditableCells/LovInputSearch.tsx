"use client";

import { CommandInput } from "@/components/ui/command";
import { useDebounce } from "@/lib/useDebounce";
import React, { useEffect, useState } from "react";

type LovInputSearchProps = {
  handleSearch: (searchValue: string) => void;
};

const LovInputSearch = ({ handleSearch }: LovInputSearchProps) => {
  const [value, setValue] = useState<string>();
  const debouncedCallback = useDebounce(() => {
    if (value !== undefined) {
      handleSearch(value);
    }
  }, 1000);

  useEffect(() => {
    debouncedCallback();
  }, [value]);

  return (
    <CommandInput
      value={value}
      onValueChange={setValue}
      placeholder="Search..."
    />
  );
};

export default LovInputSearch;
