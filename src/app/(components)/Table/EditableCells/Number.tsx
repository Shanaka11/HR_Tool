import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState } from "react";

type NumberProps = {
  defaultValue: string;
  handleOnBlur: (value: string) => void;
  disabled: boolean;
  error?: string;
  required?: boolean;
  firstCell?: boolean;
};

export const Number = ({
  defaultValue,
  handleOnBlur,
  disabled,
  error,
  required,
  firstCell,
}: NumberProps) => {
  const [value, setValue] = useState<string>(
    defaultValue !== undefined ? defaultValue.toString() : "",
  );

  if (error === "" || error === undefined) {
    return (
      <Input
        className={`w-full h-12 rounded-none focus-visible:ring-0 border-t-0 border-b-0 border-r border-l-0 focus:border focus:border-primary ${firstCell ? "border-l" : ""}`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={() => handleOnBlur(value)}
        disabled={disabled}
      />
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <Input
            className={`w-full h-12 rounded-none focus-visible:ring-0  focus:border focus:border-destructive bg-red-300 ${firstCell ? "border-l" : ""}`}
            onBlur={() => handleOnBlur(value)}
            disabled={disabled}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </TooltipTrigger>
        <TooltipContent className="text-xs bg-destructive text-white">
          <p>{error}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Number;
