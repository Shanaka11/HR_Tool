import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState } from "react";

import { useCheckRequiredStatus } from "./useCheckRequiredStatus";

type TextProps = {
  defaultValue: string;
  handleOnBlur: (value: string) => void;
  disabled: boolean;
  error?: string;
  required?: boolean;
  firstCell?: boolean;
};

export const Text = ({
  defaultValue,
  handleOnBlur,
  disabled,
  error,
  required,
  firstCell,
}: TextProps) => {
  const [value, setValue] = useState(
    defaultValue !== undefined ? defaultValue : "",
  );

  const { showRequiredError, checkShowRequiredError } = useCheckRequiredStatus({
    required,
  });

  const OnBlur = (value: string) => {
    handleOnBlur(value);
    checkShowRequiredError(value);
  };

  if (showRequiredError || (error !== "" && error !== undefined)) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full">
            <Input
              className={`w-full h-12 rounded-none focus-visible:ring-0  focus:border focus:border-destructive bg-red-300 ${firstCell ? "border-l" : ""}`}
              onBlur={(event) => OnBlur(event.target.value)}
              disabled={disabled}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </TooltipTrigger>
          <TooltipContent className="text-xs bg-destructive text-white">
            {showRequiredError ? <p>Cannot be empty</p> : <p>{error}</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Input
      className={`w-full h-12 rounded-none focus-visible:ring-0 border-t-0 border-b-0 border-r border-l-0 focus:border focus:border-primary ${firstCell ? "border-l" : ""}`}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={(event) => OnBlur(event.target.value)}
      disabled={disabled}
    />
  );
};

export default Text;
