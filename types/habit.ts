export interface HabitProps {
  id: number;
  name: string;
  detail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HistoryHabit extends HabitProps {
  completed: boolean;
}

export type HistoryProps = {
  id: number;
  habits: HistoryHabit[];
};
