import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalenderDay from "../CalenderDay/CalenderDay";
import { HabitProps } from "@/types/habit";
import { Dispatch, SetStateAction } from "react";

interface HabitCalenderProps {
  chosenDate: Date;
  history: Record<number, HabitProps[]>;
  weekOffset: number;
  setWeekOffset: Dispatch<SetStateAction<number>>;
  handleSelectDate: (d: Date) => void;
}

const HabitCalender = ({
  history,
  weekOffset,
  chosenDate,
  setWeekOffset,
  handleSelectDate,
}: HabitCalenderProps) => {
  // Start of the week (Saturday)
  const calendarDays = Array.from({ length: 7 }, (_, index) => index);

  const startOfWeek = new Date(chosenDate);
  const day = startOfWeek.getDay();

  const diff = (day + 1) % 7;

  startOfWeek.setDate(startOfWeek.getDate() - diff + weekOffset * 7);

  const visibleDays = calendarDays.map((weekDays) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + weekDays);
    return {
      date,
      label: new Intl.DateTimeFormat("en-US", { weekday: "narrow" }).format(
        date,
      ),
    };
  });

  return (
    <section aria-label="Week overview">
      <div className="flex items-center justify-between">
        <Button
          aria-label="Previous week"
          variant="ghost"
          size="icon"
          onClick={() => setWeekOffset((value) => value - 1)}
          className="text-gray-400 transition-colors hover:text-[#111] dark:hover:text-[#f8f8f6] active:scale-90"
        >
          <ChevronLeft size={18} />
        </Button>
        <div
          className="flex flex-1 justify-around overflow-hidden pb-2"
          aria-live="polite"
        >
          {visibleDays.map(({ date, label }, index) => {
            const isFuture = date > new Date();
            const isSelected =
              date.toDateString() === chosenDate.toDateString();
            const dayHabits = history[date.getTime()];
            const hasHistory = dayHabits?.some((habit) => habit.completed);
            const completedAll = Boolean(
              dayHabits?.length && dayHabits.every((habit) => habit.completed),
            );

            return (
              <CalenderDay
                key={date.toISOString()}
                date={date}
                label={label}
                index={index}
                isSelected={isSelected}
                isFuture={isFuture}
                history={history}
                handleSelectDate={handleSelectDate}
                daysLength={visibleDays.length}
                hasHistory={hasHistory}
                completedAll={completedAll}
              />
            );
          })}
        </div>
        <Button
          aria-label="Next week"
          variant="ghost"
          size="icon"
          onClick={() => setWeekOffset((value) => value + 1)}
          className="text-gray-400 transition-colors hover:text-[#111] dark:hover:text-[#f8f8f6] active:scale-90"
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    </section>
  );
};

export default HabitCalender;
