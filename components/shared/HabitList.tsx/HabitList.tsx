import HabitItem from "../HabitItem/HabitItem";
import { HistoryHabit } from "@/types/habit";
import EmptyState from "../EmptyState/EmptyState";
import { Dispatch, SetStateAction } from "react";
import { sortHistoryHabits } from "@/lib/sortHabits";

interface HabitListProps {
  habits: HistoryHabit[];
  isToday: boolean;
  historyDateId: number;
  date: Date;
  setHabits: Dispatch<SetStateAction<HistoryHabit[]>>;
  setShowCelebration: Dispatch<SetStateAction<boolean>>;
}

const HabitList = ({
  habits,
  isToday,
  historyDateId,
  date,
  setHabits,
  setShowCelebration,
}: HabitListProps) => {
  if (habits.length === 0) return <EmptyState />;

  const sortedHabits = sortHistoryHabits(habits);
  console.log(sortedHabits);

  return (
    <div className="space-y-2.5">
      {sortedHabits.map((habit) => (
        <HabitItem
          key={habit.createdAt.toISOString()}
          habit={habit}
          date={date}
          historyDateId={historyDateId}
          isToday={isToday}
          setHabits={setHabits}
          setShowCelebration={setShowCelebration}
        />
      ))}
    </div>
  );
};

export default HabitList;
