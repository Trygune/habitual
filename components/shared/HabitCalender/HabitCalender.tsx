import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalenderDay from "../CalenderDay/CalenderDay";
import { HabitProps } from "@/types/habit";

interface HabitCalenderProps {
  weekOffset: number;
  setWeekOffset: (n: (value: number) => number | number) => void;
  selectedDay: number;
  today: Date | undefined;
  history: Record<number, HabitProps[]>;
  selectDay: (n: number) => void;
}

const HabitCalender = ({
  weekOffset,
  setWeekOffset,
  selectedDay,
  history,
  selectDay,
  today,
}: HabitCalenderProps) => {
  const calendarDays = Array.from({ length: 7 }, (_, index) => index - 2);
  const todayDate = new Date();

  const visibleDays = calendarDays.map((relativeDay) => {
    const selectedDate = today ?? new Date();
    const date = new Date(selectedDate);
    date.setDate(selectedDate.getDate() + relativeDay + weekOffset * 7);
    return {
      relativeDay,
      date,
      label: new Intl.DateTimeFormat("en-US", { weekday: "narrow" }).format(
        date,
      ),
    };
  });
  return (
    <section className="px-5" aria-label="Week overview">
      <div className="flex items-center justify-between py-2.5">
        <Button
          aria-label="Previous week"
          variant="ghost"
          size="icon"
          onClick={() => setWeekOffset((value) => value - 1)}
          className="text-[#8a8a86] transition-colors hover:text-black active:scale-90"
        >
          <ChevronLeft size={18} />
        </Button>
        <div
          className="flex flex-1 justify-around overflow-hidden"
          aria-live="polite"
        >
          {visibleDays.map(({ relativeDay, date, label }, index) => {
            const dayKey = relativeDay + 2 + weekOffset * 7;
            const isFuture = date > todayDate;
            const isSelected = selectedDay === dayKey;
            const dayHabits = history[dayKey];
            const hasHistory = dayHabits?.some((habit) => habit.completed);
            const completedAll = Boolean(
              dayHabits?.length && dayHabits.every((habit) => habit.completed),
            );
            return (
              <CalenderDay
                key={date.toISOString()}
                dayKey={dayKey}
                date={date}
                label={label}
                index={index}
                isSelected={isSelected}
                isFuture={isFuture}
                history={history}
                selectDay={selectDay}
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
          className="text-[#8a8a86] transition-colors hover:text-black active:scale-90"
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    </section>
  );
};

export default HabitCalender;
