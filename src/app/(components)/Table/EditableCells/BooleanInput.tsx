import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState } from "react";

type BooleanInputProps = {
  defaultValue: string;
  handleOnBlur: (value: string) => void;
  disabled: boolean;
  error?: string;
  required?: boolean;
  firstCell?: boolean;
};

const BooleanInput = ({
  defaultValue,
  handleOnBlur,
  disabled,
  error,
  required,
  firstCell,
}: BooleanInputProps) => {
  const [value, setValue] = useState(defaultValue === "true");

  const handleOnCheckedChange = (value: boolean) => {
    setValue(value);
    handleOnBlur(value.toString());
  };

  if (error === "" && error !== undefined) {
    return (
      <div
        className={`h-12 w-full grid place-items-center border-t-0 border-b-0 border-r border-l-0 ${firstCell ? "border-l" : ""}`}
      >
        <Switch
          disabled={disabled}
          checked={value}
          onCheckedChange={handleOnCheckedChange}
        />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <div
            className={`h-12 w-full grid place-items-center border-t-0 border-b-0 border-r border-l-0 ${firstCell ? "border-l" : ""} bg-red-300`}
          >
            <Switch
              disabled={disabled}
              checked={value}
              onCheckedChange={handleOnCheckedChange}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-xs bg-destructive text-white">
          <p>{error}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BooleanInput;
