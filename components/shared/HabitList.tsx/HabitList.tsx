import { Badge } from "@/components/ui/badge";
import HabitItem from "../HabitItem/HabitItem";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { HabitProps } from "@/types/habit";
import EmptyState from "../EmptyState/EmptyState";
import { cn } from "cn";
import { getHabits, updateHabits } from "@/services/habit.service";
import { Dispatch, SetStateAction } from "react";

interface HabitListProps {
  habits: HabitProps[];
  setHabits: Dispatch<SetStateAction<HabitProps[]>>;
  setShowCelebration: Dispatch<SetStateAction<boolean>>;
  completed: number;
}

const HabitList = ({
  habits,
  setHabits,
  setShowCelebration,
  completed,
}: HabitListProps) => {
  const toggleAllHabits = async () => {
    const habits = await getHabits();

    if (habits.length === 0) return;

    const shouldComplete = habits.some((habit) => !habit.completed);
    const next = habits.map((habit) => ({
      ...habit,
      completed: shouldComplete,
    }));

    await updateHabits(next);

    setHabits(next);

    if (shouldComplete && next.length > 0) {
      setShowCelebration(true);
      window.setTimeout(() => setShowCelebration(false), 1800);
    }
  };

  return (
    <>
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
      {habits.length !== 0 ? (
        <div className="space-y-2.5">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              setHabits={setHabits}
              setShowCelebration={setShowCelebration}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default HabitList;
