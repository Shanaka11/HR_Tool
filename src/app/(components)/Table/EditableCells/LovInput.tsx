"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import CircularLoader from "../../CircularLoader";
import { Lov, RowDef } from "../types";
import LovInputSearch from "./Lov/LovInputSearch";
import LovItem from "./Lov/LovItem";

type LovInputProps<T> = {
  row: RowDef<T>;
  getLovOptions: (row: T, searchString?: string) => Promise<Lov[]>;
  handleOnBlur: (value?: any) => void;
  firstCell?: boolean;
  colName: string;
  defaultValue?: string;
  required?: boolean;
};

const LovInput = <T,>({
  row,
  getLovOptions,
  handleOnBlur,
  firstCell,
  colName,
  defaultValue,
  required,
}: LovInputProps<T>) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const { toast } = useToast();
  // TODO: When getting the lov options only get the first 15 or so options and if there are more then show a find button, that will open a dialog with a detailed lov
  const { data, isLoading, error } = useQuery({
    queryKey: [`col-${colName}`, searchValue],
    queryFn: () => getLovOptions(row.dataItem, searchValue),
    staleTime: 10 * (60 * 1000), // 10 mins
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleValueOnChange = (selectedItemValue: string) => {
    setValue(selectedItemValue === value ? "" : selectedItemValue);
    setOpen(false);
    handleOnBlur(data?.find((option) => option.id === selectedItemValue)?.item);
  };

  const handleSearch = (searchString: string) => {
    setSearchValue(searchString);
  };

  const handleOpen = (value: boolean) => {
    setOpen(value);
    setSearchValue("");
  };

  // add a cross icon to cancel the selection
  const handleCancelSelection = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setValue("");
    handleOnBlur();
  };

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <div
          // variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full  bg-background h-12 p-4 ${(value === undefined || value === null || value === "") && defaultValue === undefined ? "justify-end" : "justify-between"} rounded-none focus:ring-0 focus-visible:ring-0 border-t-0 border-b-0 border-r border-l-0 focus:border focus:border-primary ${firstCell ? "border-l" : ""} font-normal flex items-center group`}
        >
          <div>
            {value !== ""
              ? data?.find((option) => option.id === value)?.displayName
              : defaultValue}
          </div>
          <div className="flex gap-1">
            {value !== "" && (
              <X
                className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block"
                role="button"
                onClick={(event) => handleCancelSelection(event)}
              />
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100 cursor-pointer" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command
          filter={() => {
            return 1;
          }}
        >
          <LovInputSearch handleSearch={handleSearch} />
          <CommandList>
            <CommandEmpty className="grid place-items-center">
              {isLoading ? (
                <CircularLoader className="h-5 w-5" />
              ) : (
                <span>No records found</span>
              )}
            </CommandEmpty>
            {!isLoading && (
              <CommandGroup>
                {data?.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.id}
                    onSelect={handleValueOnChange}
                    className={`group ${option.displayItem !== undefined && "border-b"}`}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.displayItem === undefined ? (
                      option.displayName
                    ) : (
                      <LovItem dataItem={option.displayItem} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LovInput;
