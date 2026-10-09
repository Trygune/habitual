import { Button } from "@/components/ui/button";
import { deleteHabit, getHabitsForDate } from "@/services/habit.service";
import {
  createHistory,
  getHistory,
  updateHistory,
} from "@/services/history.service";
import { HistoryHabit } from "@/types/habit";
import { cn } from "cn";
import { Check, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface HabitItemProps {
  habit: HistoryHabit;
  isToday: boolean;
  date: Date;
  historyDateId: number;
  setHabits: Dispatch<SetStateAction<HistoryHabit[]>>;
  setShowCelebration: Dispatch<SetStateAction<boolean>>;
}

const HabitItem = ({
  habit,
  isToday,
  historyDateId,
  date,
  setHabits,
  setShowCelebration,
}: HabitItemProps) => {
  const [removingId, setRemovingId] = useState<number | null>(null);

  const toggleHabit = async (id: number) => {
    const history = await getHistory(historyDateId);

    if (history) {
      const habits = history.habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              updatedAt: new Date(),
            }
          : habit,
      );

      await updateHistory({
        id: historyDateId,
        habits,
      });
    } else {
      const habits = await getHabitsForDate(date);

      const historyHabits: HistoryHabit[] = habits.map((habit, index) => ({
        ...habit,
        completed: habit.id === id,
        order: index,
      }));

      await createHistory({
        id: historyDateId,
        habits: historyHabits,
      });
    }

    setHabits((current) => {
      const next = current.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              updatedAt: new Date(),
            }
          : habit,
      );
      if (
        next.length > 0 &&
        next.every((habit) => habit.completed) &&
        !current.every((habit) => habit.completed)
      ) {
        setShowCelebration(true);
        window.setTimeout(() => setShowCelebration(false), 1800);
      }
      return next;
    });
  };

  const removeHabit = async (id: number) => {
    if (isToday) {
      await deleteHabit(id);
    }

    const history = await getHistory(historyDateId);

    if (history) {
      const habits = history.habits
        .filter((habit) => habit.id !== id)
        .map((habit) => ({
          ...habit,
          ...(habit.order !== undefined && {
            order:
              habit.order -
              (history.habits.find((item) => item.id === id)?.order !==
                undefined &&
              history.habits.find((item) => item.id === id)!.order! <
                habit.order
                ? 1
                : 0),
          }),
        }));

      await updateHistory({
        id: historyDateId,
        habits,
      });
    } else {
      const habits = await getHabitsForDate(date);

      const historyHabits: HistoryHabit[] = habits
        .filter((habit) => habit.id !== id)
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map((habit, index) => ({
          ...habit,
          completed: false,
          order: index,
        }));

      await createHistory({
        id: historyDateId,
        habits: historyHabits,
      });
    }

    setRemovingId(id);
    window.setTimeout(() => {
      setHabits((current) => {
        const next = current.filter((habit) => habit.id !== id);

        return next.map((habit, index) => ({
          ...habit,
          ...(habit.order !== undefined && { order: index }),
        }));
      });
      setRemovingId(null);
    }, 260);
  };

  return (
    <div
      className={cn(
        "habit-row group flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#f8f8f6] dark:bg-[#111] dark:border-gray-500 p-3.5 transition-all duration-300",
        removingId === habit.id && "habit-removing",
        habit.completed && "habit-done",
      )}
    >
      <Button
        onClick={() => toggleHabit(habit.id)}
        aria-label={`${habit.completed ? "Mark" : "Complete"} ${habit.name}`}
        variant="outline"
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
          habit.completed
            ? "border-[#111] bg-[#111] text-[#f8f8f6] hover:bg-[#111] hover:text-[#f8f8f6] dark:border-[#f8f8f6] dark:bg-gray-200 dark:text-[#111] dark:hover:bg-[#f8f8f6] dark:hover:text-[#111]"
            : "border-[#d6d6d1] bg-[#f8f8f6] text-transparent hover:border-[#111] hover:text-[#111] dark:border-[#5a5a5a] dark:bg-[#111] dark:hover:border-[#f8f8f6] dark:hover:text-[#f8f8f6]",
        )}
      >
        <Check size={16} strokeWidth={2.5} />
      </Button>
      <div
        onClick={() => toggleHabit(habit.id)}
        className="min-w-0 flex-1 text-left cursor-pointer"
      >
        <p
          className={cn(
            "truncate text-sm font-medium transition-colors text-[#171714] dark:text-[#e7e7cb]",
            habit.completed && "text-gray-400 dark:text-gray-300 line-through",
          )}
        >
          {habit.name}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-300">
          {habit.detail}
        </p>
      </div>
      <Button
        onClick={() => removeHabit(habit.id)}
        aria-label={`Remove ${habit.name}`}
        variant="ghost"
        size="icon"
        className="grid place-items-center rounded-full text-gray-400 dark:text-gray-200 transition-all hover:text-[#111] dark:hover:text-[#f8f8f6]"
      >
        <Trash2 size={15} />
      </Button>
    </div>
  );
};

export default HabitItem;
