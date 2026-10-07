export interface HabitProps {
  id: number;
  name: string;
  detail: string;
  completed: boolean;
}

export type HistoryProps = {
  id: number;
  habits: HabitProps[];
};
