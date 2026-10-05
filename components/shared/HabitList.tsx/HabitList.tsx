import { Badge } from "@/components/ui/badge";
import HabitItem from "../HabitItem/HabitItem";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { HabitProps } from "@/types/habit";
import EmptyState from "../EmptyState/EmptyState";

interface HabitListProps {
  habits: HabitProps[];
  setHabits: (n: (h: HabitProps[]) => HabitProps[]) => void;
  setHistory: (
    n: (r: Record<number, HabitProps[]>) => Record<number, HabitProps[]>,
  ) => void;
  setShowCelebration: (b: boolean) => void;
  selectedDay: number;
  completed: number;
}

const HabitList = ({
  habits,
  setHabits,
  setHistory,
  setShowCelebration,
  selectedDay,
  completed,
}: HabitListProps) => {
  function toggleAllHabits() {
    setHabits((current) => {
      const shouldComplete = current.some((habit) => !habit.completed);
      const next = current.map((habit) => ({
        ...habit,
        completed: shouldComplete,
      }));
      setHistory((saved) => ({ ...saved, [selectedDay]: next }));
      if (shouldComplete && next.length > 0) {
        setShowCelebration(true);
        window.setTimeout(() => setShowCelebration(false), 1800);
      }
      return next;
    });
  }
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">
          Today&apos;s habits
        </h2>
        <div className="flex items-center gap-2">
          <Badge
            variant="ghost"
            className="text-[11px] font-medium text-[#999995]"
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
              className="text-[10px] border border-[#e1e1dd] font-semibold text-[#777771] transition-colors hover:border-[#111] active:scale-95"
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
              setHistory={setHistory}
              setShowCelebration={setShowCelebration}
              selectedDay={selectedDay}
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
