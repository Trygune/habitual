import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { Check, Trash2 } from "lucide-react";
import { useState } from "react";

const HabitItem = ({
  habit,
  setHabits,
  setHistory,
  setShowCelebration,
  selectedDay,
}) => {
  const [removingId, setRemovingId] = useState<number | null>(null);

  function toggleHabit(id: number) {
    setHabits((current) => {
      const next = current.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit,
      );
      setHistory((saved) => ({ ...saved, [selectedDay]: next }));
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
  }

  function removeHabit(id: number) {
    setRemovingId(id);
    window.setTimeout(() => {
      setHabits((current) => current.filter((habit) => habit.id !== id));
      setRemovingId(null);
    }, 260);
  }

  return (
    <div
      key={habit.id}
      className={`habit-row group flex items-center gap-3 rounded-2xl border border-[#e5e5e1] bg-white p-3.5 transition-all duration-300 ${removingId === habit.id ? "habit-removing" : ""} ${habit.completed ? "habit-done" : ""}`}
    >
      <Button
        onClick={() => toggleHabit(habit.id)}
        aria-label={`${habit.completed ? "Mark" : "Complete"} ${habit.name}`}
        variant="outline"
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
          habit.completed
            ? "border-[#111] bg-[#111] text-white hover:bg-[#111] hover:text-white"
            : "border-[#d6d6d1] bg-white text-transparent hover:border-[#111] hover:text-[#111]",
        )}
      >
        <Check size={16} strokeWidth={2.5} />
      </Button>
      <div
        onClick={() => toggleHabit(habit.id)}
        className="min-w-0 flex-1 text-left cursor-pointer"
      >
        <p
          className={`truncate text-sm font-medium transition-colors ${habit.completed ? "text-[#8e8e89] line-through" : "text-[#171714]"}`}
        >
          {habit.name}
        </p>
        <p className="mt-0.5 text-[11px] text-[#a0a09b]">{habit.detail}</p>
      </div>
      <Button
        onClick={() => removeHabit(habit.id)}
        aria-label={`Remove ${habit.name}`}
        variant="ghost"
        size="icon"
        className="grid place-items-center rounded-full text-[#c0c0bb] opacity-0 transition-all hover:bg-[#f1f1ef] hover:text-[#111] group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Trash2 size={15} />
      </Button>
    </div>
  );
};

export default HabitItem;
