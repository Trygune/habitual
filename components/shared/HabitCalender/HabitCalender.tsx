import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalenderDay from "../CalenderDay/CalenderDay";
import { HabitProps } from "@/types/habit";
import { useState } from "react";

interface HabitCalenderProps {
  chosenDate: Date;
  history: Record<number, HabitProps[]>;
  setDate: (d: Date) => void;
}

const HabitCalender = ({
  history,
  setDate,
  chosenDate,
}: HabitCalenderProps) => {
  const [weekOffset, setWeekOffset] = useState(0);

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

  const handleSelectDate = (date: Date) => {
    setDate(date);
    setWeekOffset(() => 0);
  };

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
          className="text-[#8a8a86] transition-colors hover:text-black active:scale-90"
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    </section>
  );
};

export default HabitCalender;
