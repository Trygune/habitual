import { db } from "@/lib/db/db";
import type { HabitProps } from "@/types/habit";

export const getHabits = async (): Promise<HabitProps[]> => {
  return db.habits.toArray();
};

export const getHabit = async (id: number): Promise<HabitProps | undefined> => {
  return db.habits.get(id);
};

export const createHabit = async (habit: HabitProps): Promise<number> => {
  return db.habits.add(habit);
};

export const updateHabit = async (habit: HabitProps): Promise<number> => {
  return db.habits.update(habit.id, habit);
};

export const updateHabits = async (habits: HabitProps[]): Promise<void> => {
  await db.habits.bulkPut(habits);
};

export const deleteHabit = async (id: number): Promise<void> => {
  await db.habits.delete(id);
};
