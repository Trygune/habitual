export interface HabitProps {
  id: number;
  name: string;
  detail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HistoryHabit extends HabitProps {
  completed: boolean;
  order: number;
}

export type HistoryProps = {
  id: number;
  habits: HistoryHabit[];
};
