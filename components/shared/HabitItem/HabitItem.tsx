import { Button } from "@/components/ui/button";
import { deleteHabit, getHabit, updateHabit } from "@/services/habit.service";
import { HabitProps } from "@/types/habit";
import { cn } from "cn";
import { Check, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface HabitItemProps {
  habit: HabitProps;
  setHabits: Dispatch<SetStateAction<HabitProps[]>>;
  setShowCelebration: Dispatch<SetStateAction<boolean>>;
}

const HabitItem = ({
  habit,
  setHabits,
  setShowCelebration,
}: HabitItemProps) => {
  const [removingId, setRemovingId] = useState<number | null>(null);

  const toggleHabit = async (id: number) => {
    const habit = await getHabit(id);

    if (!habit) return;

    const updatedHabit = {
      ...habit,
      completed: !habit.completed,
    };

    await updateHabit(updatedHabit);

    setHabits((current) => {
      const next = current.map((habit) =>
        habit.id === id ? updatedHabit : habit,
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
    const habit = await getHabit(id);

    if (!habit) return;

    await deleteHabit(id);

    setRemovingId(id);
    window.setTimeout(() => {
      setHabits((current) => current.filter((habit) => habit.id !== id));
      setRemovingId(null);
    }, 260);
  };

  return (
    <div
      key={habit.id}
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
