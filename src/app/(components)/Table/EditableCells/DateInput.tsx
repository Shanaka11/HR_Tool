import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getDateString } from "@/lib/tableUtils";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";

import { useCheckRequiredStatus } from "./useCheckRequiredStatus";

type DateProps = {
  defaultValue: string;
  handleOnBlur: (value: string) => void;
  disabled: boolean;
  error?: string;
  required?: boolean;
  firstCell?: boolean;
};

export const DateInput = ({
  defaultValue,
  handleOnBlur,
  disabled,
  error,
  required,
  firstCell,
}: DateProps) => {
  const [value, setValue] = useState<string>(
    defaultValue !== undefined && defaultValue !== null
      ? defaultValue.toString()
      : "",
  );

  const [date, setDate] = useState<Date | undefined>(new Date(defaultValue));
  const [calenderOpen, setCalenderOpen] = useState<boolean>(false);

  const { showRequiredError, checkShowRequiredError } = useCheckRequiredStatus({
    required,
  });

  const handleSetDate = (newDate?: Date) => {
    setDate(newDate);
    const dateString = getDateString(newDate);
    setValue(dateString !== undefined && dateString !== null ? dateString : "");
    handleOnBlur(
      dateString !== undefined && dateString !== null ? dateString : "",
    );
    setCalenderOpen(false);

    if (dateString !== undefined && dateString !== null) {
      checkShowRequiredError(dateString?.toString());
    } else {
      checkShowRequiredError("");
    }
  };

  const handleOnChange = (value: string) => {
    setValue(value);
    setDate(new Date(value));
  };

  const handleCellOnBlur = () => {
    if (defaultValue === value) return;
    handleOnBlur(value);
  };

  if (showRequiredError || (error !== "" && error !== undefined)) {
    return (
      <div className="relative z-10 flex items-center">
        <Popover open={calenderOpen} onOpenChange={setCalenderOpen}>
          <PopoverTrigger asChild>
            <Button className="absolute right-2 h-7 w-8" size="icon">
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSetDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <div className="flex relative items-center">
                <Input
                  className={`w-full h-12 rounded-none focus-visible:ring-0  focus:border focus:border-destructive bg-red-300 ${firstCell ? "border-l" : ""}`}
                  onBlur={() => handleOnBlur(value)}
                  disabled={disabled}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  type="date"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="text-xs bg-destructive text-white">
              {showRequiredError ? <p>Cannot be empty</p> : <p>{error}</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
  return (
    <div className="flex relative items-center">
      <Input
        className={`w-full h-12 rounded-none focus-visible:ring-0 border-t-0 border-b-0 border-r border-l-0 focus:border focus:border-primary ${firstCell ? "border-l" : ""}`}
        type="date"
        value={value}
        onChange={(event) => handleOnChange(event.target.value)}
        onBlur={handleCellOnBlur}
        disabled={disabled}
      />
      <Popover open={calenderOpen} onOpenChange={setCalenderOpen}>
        <PopoverTrigger asChild>
          <Button className="absolute right-2 h-7 w-8" size="icon">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSetDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateInput;
