"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProgressBar from "@/components/shared/ProgressBar/ProgressBar";
import Footer from "@/components/layout/Footer/Footer";
import HabitList from "@/components/shared/HabitList.tsx/HabitList";
import HabitCalender from "@/components/shared/HabitCalender/HabitCalender";
import Header from "@/components/layout/Header/Header";
import AddHabit from "@/components/shared/AddHabit/AddHabit";
import { Button } from "@/components/ui/button";
import { HabitProps } from "@/types/habit";
import { cn } from "cn";
import { getHabits } from "@/services/habit.service";

const App = () => {
  const [habits, setHabits] = useState<HabitProps[]>([]);
  const [history, setHistory] = useState<Record<number, HabitProps[]>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [date, setDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const historyDateId = date.getTime();

  const completed = habits.filter((habit) => habit.completed).length;

  const isFuture = date > new Date();

  const handleSelectDate = (date: Date) => {
    setDate(date);
    setWeekOffset(() => 0);
  };

  useEffect(() => {
    const loadHabits = async () => {
      const storedHabits = await getHabits();

      setHabits(storedHabits);
    };

    loadHabits();
  }, []);

  useEffect(() => {
    setHabits(
      history[historyDateId] ??
        habits.map((habit) => ({ ...habit, completed: false })),
    );
    setIsAdding(false);
  }, [date]);

  useEffect(() => {
    if (!isAdding) return;

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [isAdding]);

  useEffect(() => {
    setHistory((saved) => {
      const updated = { ...saved };

      if (habits.length === 0) {
        if (saved[historyDateId]) {
          delete updated[historyDateId];
        }
        return updated;
      }

      return { ...saved, [historyDateId]: habits };
    });
  }, [habits]);

  return (
    <main className="mx-auto px-5 gap-y-5 flex min-h-screen w-full max-w-md flex-col overscroll-contain bg-[#f8f8f6] dark:bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
      <Header date={date} handleSelectDate={handleSelectDate} />
      <HabitCalender
        history={history}
        weekOffset={weekOffset}
        setWeekOffset={setWeekOffset}
        handleSelectDate={handleSelectDate}
        chosenDate={date}
      />

      <section className={cn(isFuture && "pointer-events-none opacity-50")}>
        <ProgressBar
          showCelebration={showCelebration}
          habitsLength={habits.length}
          completed={completed}
        />
      </section>

      <section
        className={cn("flex-1", isFuture && "pointer-events-none opacity-50")}
      >
        <HabitList
          habits={habits}
          setHabits={setHabits}
          setShowCelebration={setShowCelebration}
          completed={completed}
        />

        {isAdding ? (
          <AddHabit setHabits={setHabits} setIsAdding={setIsAdding} />
        ) : (
          <Button
            onClick={() => setIsAdding(true)}
            variant="ghost"
            size="lg"
            className="mt-2.5 w-full rounded-2xl border border-dashed border-[#d4d4cf] text-xs font-semibold text-[#777771] transition-all hover:border-[#111] dark:hover:border-[#f8f8f6] active:scale-[0.98]"
          >
            <Plus size={15} data-icon="inline-start" />
            Add a habit
          </Button>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default App;
