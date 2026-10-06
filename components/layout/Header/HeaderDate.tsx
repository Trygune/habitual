import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/formatDate";
import { ChevronDownIcon } from "lucide-react";

interface HeaderDateProps {
  date: Date | undefined;
  setDate: (d: Date) => void;
}

const HeaderDate = ({ date, setDate }: HeaderDateProps) => {
  const choseDate = (time: Date | undefined) => {
    if (time) return setDate(time);

    return setDate(new Date(new Date().setHours(0, 0, 0, 0)));
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            data-empty={!date}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#858581] text-left data-[empty=true]:text-muted-foreground"
          >
            {date && formatDate(date)}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(time) => choseDate(time)}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
};

export default HeaderDate;
