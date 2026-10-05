"use client";

import { useState, type CSSProperties } from "react";
import { Plus } from "lucide-react";
import ProgressBar from "@/components/shared/ProgressBar/ProgressBar";
import Footer from "@/components/layout/Footer/Footer";
import HabitList from "@/components/shared/HabitList.tsx/HabitList";
import HabitCalender from "@/components/shared/HabitCalender/HabitCalender";
import Header from "@/components/layout/Header/Header";
import { themeColors } from "@/components/layout/Header/ThemePicker";
import AddHabit from "@/components/shared/AddHabit/AddHabit";
import { Button } from "@/components/ui/button";
import { HabitProps } from "@/types/habit";

const App = () => {
  const [habits, setHabits] = useState<HabitProps[]>([]);
  const [history, setHistory] = useState<Record<number, HabitProps[]>>({});
  const [selectedDay, setSelectedDay] = useState(2);
  const [isAdding, setIsAdding] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const completed = habits.filter((habit) => habit.completed).length;

  const selectDay = (dayIndex: number) => {
    if (dayIndex > 2) return;
    setSelectedDay(dayIndex);
    setHabits(history[dayIndex] ?? []);
    setIsAdding(false);
  };

  return (
    <main
      style={{ "--theme-color": themeColors[themeIndex] } as CSSProperties}
      className="min-h-screen overflow-y-auto bg-[#ededeb] text-[#111111] sm:py-8"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col overscroll-contain bg-[#f8f8f6] shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
        <Header
          setWeekOffset={setWeekOffset}
          selectDay={selectDay}
          themeIndex={themeIndex}
          setThemeIndex={setThemeIndex}
          selectedDay={selectedDay}
          date={date}
          setDate={setDate}
        />
        <HabitCalender
          weekOffset={weekOffset}
          setWeekOffset={setWeekOffset}
          selectedDay={selectedDay}
          history={history}
          selectDay={selectDay}
          today={date}
        />
        <ProgressBar
          showCelebration={showCelebration}
          habitsLength={habits.length}
          completed={completed}
        />

        <section className="flex-1 px-6 pb-6 pt-7">
          <HabitList
            habits={habits}
            setHabits={setHabits}
            setHistory={setHistory}
            setShowCelebration={setShowCelebration}
            selectedDay={selectedDay}
            completed={completed}
          />

          {isAdding ? (
            <AddHabit setHabits={setHabits} setIsAdding={setIsAdding} />
          ) : (
            <Button
              onClick={() => setIsAdding(true)}
              variant="ghost"
              size="lg"
              className="mt-3 w-full rounded-2xl border border-dashed border-[#d4d4cf] text-xs font-semibold text-[#777771] transition-all hover:border-[#111] active:scale-[0.98]"
            >
              <Plus size={15} data-icon="inline-start" />
              Add a habit
            </Button>
          )}
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default App;
