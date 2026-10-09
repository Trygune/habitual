"use client";

import { useEffect, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import ProgressBar from "@/components/shared/ProgressBar/ProgressBar";
import Footer from "@/components/layout/Footer/Footer";
import HabitList from "@/components/shared/HabitList.tsx/HabitList";
import HabitCalender from "@/components/shared/HabitCalender/HabitCalender";
import Header from "@/components/layout/Header/Header";
import AddHabit from "@/components/shared/AddHabit/AddHabit";
import { Button } from "@/components/ui/button";
import { HistoryHabit } from "@/types/habit";
import { cn } from "cn";
import { getHabitsForDate } from "@/services/habit.service";
import { Badge } from "@/components/ui/badge";
import {
  createHistory,
  getHistories,
  getHistory,
  updateHistory,
} from "@/services/history.service";
import { deleteUserSettings, getUserSettings } from "@/services/user.service";
import Onboarding from "@/components/shared/Onboarding/Onboarding";
import LoadingState from "@/components/shared/LoadingState/LoadingState";

const App = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [habits, setHabits] = useState<HistoryHabit[]>([]);
  const [history, setHistory] = useState<Record<number, HistoryHabit[]>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [date, setDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const todayId = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  const historyDateId = date.getTime();

  const isToday = historyDateId === todayId;
  const isFuture = historyDateId > todayId;

  const completed = habits.filter((habit) => habit.completed).length;

  const loadWeekHistory = async () => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = (day + 1) % 7;

    startOfWeek.setDate(startOfWeek.getDate() - diff + weekOffset * 7);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const histories = await getHistories(
      startOfWeek.getTime(),
      endOfWeek.getTime(),
    );

    setHistory(
      Object.fromEntries(histories.map((item) => [item.id, item.habits])),
    );
  };

  const handleSelectDate = (date: Date) => {
    setDate(date);
    setWeekOffset(0);
  };

  const handleChangeName = async () => {
    await deleteUserSettings();
    setUserName(null);
  };

  const toggleAllHabits = async () => {
    if (habits.length === 0) return;

    const history = await getHistory(historyDateId);

    const shouldComplete = habits.some((habit) => !habit.completed);
    const updatedAt = new Date();

    const next = habits.map((habit, index) => ({
      ...habit,
      completed: shouldComplete,
      order: index,
      updatedAt,
    }));

    if (history) {
      await updateHistory({
        id: historyDateId,
        habits: next,
      });
    } else {
      await createHistory({
        id: historyDateId,
        habits: next,
      });
    }

    setHabits(next);

    if (shouldComplete && next.length > 0) {
      setShowCelebration(true);
      window.setTimeout(() => setShowCelebration(false), 1800);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const settings = await getUserSettings();

      setUserName(settings?.name ?? null);
      setIsLoadingUser(false);
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!isAdding) return;

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [isAdding]);

  useEffect(() => {
    const loadHistory = async () => {
      const storedHistory = await getHistory(historyDateId);

      if (storedHistory) {
        // This day already has history
        setHabits(storedHistory.habits);

        return;
      }

      const storedHabits = await getHabitsForDate(date);

      // No history → build the day's current habit snapshot
      setHabits(
        storedHabits.map((habit, index) => ({
          ...habit,
          completed: false,
          order: index,
        })),
      );
    };

    setIsAdding(false);
    loadHistory();
  }, [date]);

  useEffect(() => {
    loadWeekHistory();
  }, [date, weekOffset]);

  if (isLoadingUser) {
    return <LoadingState />;
  } else {
    if (!userName) {
      return <Onboarding onComplete={setUserName} />;
    }
  }

  return (
    <main className="mx-auto px-5 gap-y-5 flex min-h-dvh w-full max-w-md flex-col overscroll-contain bg-[#f8f8f6] dark:bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
      <Header
        userName={userName}
        date={date}
        handleSelectDate={handleSelectDate}
        handleChangeName={handleChangeName}
      />
      <HabitCalender
        history={history}
        weekOffset={weekOffset}
        chosenDate={date}
        setWeekOffset={setWeekOffset}
        handleSelectDate={handleSelectDate}
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
        <div
          className={cn(
            "mb-1 flex items-center justify-between",
            habits.length !== 0 && "mb-2.5",
          )}
        >
          <h2 className="text-sm font-semibold tracking-tight">
            Today&apos;s habits
          </h2>
          <div className="flex items-center gap-2">
            <Badge
              variant="ghost"
              className="text-[11px] font-medium text-gray-400"
            >
              {habits.length} total
            </Badge>
            {habits.length !== 0 && (
              <Button
                onClick={toggleAllHabits}
                aria-label={
                  completed === habits.length
                    ? "Uncheck all habits"
                    : "Check all habits"
                }
                variant="ghost"
                size="xs"
                className="text-[10px] border border-gray-300 font-semibold text-gray-500 transition-colors hover:border-[#111] active:scale-95 dark:border-gray-400 dark:text-gray-300 dark:hover:border-[#f8f8f6]"
              >
                {completed === habits.length ? "Clear" : "Check all"}
                {completed === habits.length ? (
                  <X data-icon="inline-end" />
                ) : (
                  <Check data-icon="inline-end" />
                )}
              </Button>
            )}
          </div>
        </div>

        <HabitList
          habits={habits}
          isToday={isToday}
          date={date}
          historyDateId={historyDateId}
          setHabits={setHabits}
          setShowCelebration={setShowCelebration}
        />

        {isAdding ? (
          <AddHabit
            setHabits={setHabits}
            setIsAdding={setIsAdding}
            isToday={isToday}
            historyDateId={historyDateId}
          />
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
