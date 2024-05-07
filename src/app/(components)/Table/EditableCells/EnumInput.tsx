import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState } from "react";

type EnumInputProps = {
  options: string[];
  defaultValue?: string;
  handleOnBlur: (value: string) => void;
  disabled: boolean;
  error?: string;
  required?: boolean;
  firstCell?: boolean;
};
// Should be a select with null option available depending if col is mandatory or not
const EnumInput = ({
  defaultValue,
  options,
  firstCell,
  required,
  disabled,
  handleOnBlur,
  error,
}: EnumInputProps) => {
  const [value, setValue] = useState(defaultValue ?? null);

  const handleValueOnChange = (newValue: string) => {
    if (newValue == "null") {
      setValue(null);
      handleOnBlur("");
      return;
    }
    setValue(newValue);
    handleOnBlur(newValue);
  };

  if (error === "" || error === undefined) {
    return (
      <Select
        value={value === null || value === undefined ? undefined : value}
        onValueChange={handleValueOnChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={`w-full h-12 rounded-none focus:ring-0 focus-visible:ring-0 border-t-0 border-b-0 border-r border-l-0 focus:border focus:border-primary ${firstCell ? "border-l" : ""}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {!required && <SelectItem value="null" className="h-9"></SelectItem>}
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <Select
            value={value === null || value === undefined ? undefined : value}
            onValueChange={handleValueOnChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={`w-full h-12 rounded-none focus:ring-0 focus-visible:ring-0 focus:border focus:border-destructive bg-red-300 ${firstCell ? "border-l" : ""}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {!required && (
                <SelectItem value="null" className="h-9"></SelectItem>
              )}
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TooltipTrigger>
        <TooltipContent className="text-xs bg-destructive text-white">
          <p>{error}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EnumInput;
