import { db } from "@/lib/db/db";
import type { HabitProps } from "@/types/habit";

export const getHabits = async (): Promise<HabitProps[]> => {
  return db.habits.toArray();
};

export const getHabitsForDate = async (date: Date): Promise<HabitProps[]> => {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const habits = await getHabits();

  return habits.filter((habit) => habit.createdAt <= endOfDay);
};

export const createHabit = async (habit: HabitProps): Promise<number> => {
  return db.habits.add(habit);
};

export const deleteHabit = async (id: number): Promise<void> => {
  await db.habits.delete(id);
};
