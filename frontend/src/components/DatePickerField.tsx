import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerFieldProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DatePickerField = ({
  id,
  label,
  value,
  onChange,
  placeholder = "Select date",
}: DatePickerFieldProps) => {
  const date = value ? parseISO(value) : undefined;
  const [open, setOpen] = useState(false);

  return (
    <div className="grid gap-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            className="w-full justify-start gap-2 font-normal"
          >
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
            {date ? (
              <span className="font-mono tabular-nums">
                {format(date, "MMM d, yyyy")}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              onChange(d ? format(d, "yyyy-MM-dd") : "");
              setOpen(false);
            }}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerField;
