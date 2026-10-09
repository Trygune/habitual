import type { HistoryHabit } from "@/types/habit";

export const sortHistoryHabits = (habits: HistoryHabit[]): HistoryHabit[] => {
  const hasOrder = habits.every((habit) => habit.order !== undefined);

  if (hasOrder) {
    return [...habits].sort((a, b) => b.order - a.order);
  }

  return [...habits].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
};
