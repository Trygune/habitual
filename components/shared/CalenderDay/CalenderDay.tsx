import { Separator } from "@/components/ui/separator";
import { HistoryHabit } from "@/types/habit";
import { cn } from "cn";

interface CalenderDayProps {
  handleSelectDate: (d: Date) => void;
  index: number;
  daysLength: number;
  date: Date;
  label: string;
  history: Record<number, HistoryHabit[]>;
  isSelected: boolean;
  hasHistory: boolean;
  completedAll: boolean;
}

const CalenderDay = ({
  date,
  label,
  index,
  isSelected,
  handleSelectDate,
  daysLength,
  hasHistory,
  completedAll,
}: CalenderDayProps) => {
  return (
    <>
      <button
        onClick={() => handleSelectDate(date)}
        aria-label={`View ${label} ${date.getDate()}`}
        className={cn(
          "flex animate-[habit-add_260ms_ease-out] flex-col items-center gap-2",
        )}
      >
        <span className="text-[10px] font-medium text-gray-400">{label}</span>
        <span
          className={cn(
            "grid size-6 place-items-center rounded-full text-xs font-semibold transition-all",
            isSelected
              ? "text-[#f8f8f6] bg-[#111] dark:text-[#111] dark:bg-gray-200 shadow-[0_3px_8px_rgba(0,0,0,0.18)]"
              : completedAll
                ? "bg-[#111]/15 text-[#111] ring-1 ring-[#111]/50 dark:bg-[#f8f8f6]/15 dark:text-[#f8f8f6] dark:ring-[#f8f8f6]/50"
                : hasHistory
                  ? "bg-[#dededb] text-gray-500 dark:bg-[#f8f8f6]/20 dark:text-gray-200"
                  : "text-gray-400 hover:bg-[#e8e8e5] dark:hover:bg-[#2c2c2c]",
          )}
        >
          {date.getDate()}
        </span>
      </button>
      {index < daysLength - 1 && (
        <Separator
          orientation="vertical"
          className={cn(
            "my-auto h-12 text-gray-400",
            Math.min(index, daysLength - 2 - index) === 0 && "h-8",
            Math.min(index, daysLength - 2 - index) === 1 && "h-10",
          )}
        />
      )}
    </>
  );
};

export default CalenderDay;
