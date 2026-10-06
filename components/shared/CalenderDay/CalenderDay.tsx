import { Separator } from "@/components/ui/separator";
import { HabitProps } from "@/types/habit";
import { cn } from "cn";

interface CalenderDayProps {
  handleSelectDate: (d: Date) => void;
  index: number;
  daysLength: number;
  date: Date;
  label: string;
  history: Record<number, HabitProps[]>;
  isFuture: boolean;
  isSelected: boolean;
  hasHistory: boolean;
  completedAll: boolean;
}

const CalenderDay = ({
  date,
  label,
  index,
  isFuture,
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
        disabled={isFuture}
        aria-label={`View ${label} ${date.getDate()}`}
        className={cn(
          "flex animate-[habit-add_260ms_ease-out] flex-col items-center gap-2",
          isFuture && "cursor-not-allowed opacity-35",
        )}
      >
        <span className="text-[10px] font-medium text-[#747474]">{label}</span>
        <span
          className={cn(
            "grid size-6 place-items-center rounded-full text-xs font-semibold transition-all",
            isSelected
              ? "text-white shadow-[0_3px_8px_rgba(0,0,0,0.18)]"
              : completedAll
                ? "bg-(--theme-color)/15 text-(--theme-color) ring-1 ring-(--theme-color)/50"
                : hasHistory
                  ? "bg-[#dededb] text-[#555550]"
                  : "text-[#747474] hover:bg-[#e8e8e5]",
          )}
          style={
            isSelected ? { backgroundColor: "var(--theme-color)" } : undefined
          }
        >
          {date.getDate()}
        </span>
      </button>
      {index < daysLength - 1 && (
        <Separator
          orientation="vertical"
          className={cn(
            "my-auto h-12",
            Math.min(index, daysLength - 2 - index) === 0 && "h-8",
            Math.min(index, daysLength - 2 - index) === 1 && "h-10",
          )}
        />
      )}
    </>
  );
};

export default CalenderDay;
