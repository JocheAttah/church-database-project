import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface DatePickerProps {
  value: Date | string;
  onChange: (date: string) => void;
  placeholder?: string;
  error?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  error = false,
}: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex w-full border border-mineshaft bg-transparent pl-3 text-left font-normal hover:bg-transparent hover:text-inherit",
            !value && "text-dustygray",
            error && "border-red-500",
          )}
        >
          {value ? formatDate(value) : <span>{placeholder}</span>}
          <CalendarDaysIcon className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => {
            onChange(date ? formatDate(date, "yyyy-MM-dd") : "");
            setIsCalendarOpen(false);
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
}
