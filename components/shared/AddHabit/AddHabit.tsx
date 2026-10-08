import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createHabit } from "@/services/habit.service";
import {
  createHistory,
  getHistory,
  updateHistory,
} from "@/services/history.service";
import { HabitProps, HistoryHabit } from "@/types/habit";
import { Dispatch, SetStateAction, useState } from "react";

interface AddHabitProps {
  setHabits: Dispatch<SetStateAction<HistoryHabit[]>>;
  setIsAdding: Dispatch<SetStateAction<boolean>>;
  isToday: boolean;
  historyDateId: number;
}

const AddHabit = ({
  setHabits,
  setIsAdding,
  isToday,
  historyDateId,
}: AddHabitProps) => {
  const [newHabit, setNewHabit] = useState("");
  const [newDetail, setNewDetail] = useState("");

  const cancelNewHabit = () => {
    setNewHabit("");
    setNewDetail("");
    setIsAdding(false);
  };

  const addNewHabit = async () => {
    const name = newHabit.trim();

    if (!name) return;

    const now = new Date();

    const habit: HabitProps = {
      id: Date.now(),
      name,
      detail: newDetail.trim() || "Daily habit",
      createdAt: now,
      updatedAt: now,
    };

    const historyHabit: HistoryHabit = {
      ...habit,
      completed: false,
    };

    if (isToday) {
      await createHabit(habit);
    }

    const history = await getHistory(historyDateId);

    if (history) {
      await updateHistory({
        id: historyDateId,
        habits: [...history.habits, historyHabit],
      });
    } else {
      await createHistory({
        id: historyDateId,
        habits: [historyHabit],
      });
    }

    setHabits((current) => [...current, historyHabit]);

    cancelNewHabit();
  };

  return (
    <div className="habit-add mt-3 flex flex-col gap-1.5 rounded-2xl border border-[#111] bg-[#f8f8f6] dark:border-[#f8f8f6] dark:bg-[#111] px-2 py-2.5">
      <Input
        autoFocus
        value={newHabit}
        onChange={(event) => setNewHabit(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.nativeEvent.isComposing)
            addNewHabit();
          if (event.key === "Escape") cancelNewHabit();
        }}
        placeholder="Name your new habit"
        className="w-full bg-transparent font-normal focus-visible:ring-0 border-none placeholder:text-[#aaa] dark:placeholder:text-[#b6b6b6]"
      />
      <Separator />
      <Input
        value={newDetail}
        onChange={(event) => setNewDetail(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.nativeEvent.isComposing)
            addNewHabit();
          if (event.key === "Escape") cancelNewHabit();
        }}
        placeholder="Add a detail (e.g. 20 minutes)"
        className="w-full bg-transparent font-light focus-visible:ring-0 border-none placeholder:text-[#aaa] dark:placeholder:text-[#b6b6b6]"
      />
      <div className="flex justify-end gap-2 mt-1.5">
        <Button
          onClick={cancelNewHabit}
          variant="ghost"
          size="sm"
          className="rounded-xl text-xs font-semibold text-gray-500 transition-colors hover:bg-[#f1f1ef] hover:text-[#111] dark:text-gray-300 dark:hover:bg-[#1b1b1b] dark:hover:text-[#f1f1ef]"
        >
          Cancel
        </Button>
        <Button
          onClick={addNewHabit}
          size="sm"
          className="rounded-xl bg-[#111] text-xs font-semibold text-[#f8f8f6] transition-transform active:scale-95 dark:bg-[#f8f8f6] dark:text-[#111]"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddHabit;
