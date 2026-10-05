import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HabitProps } from "@/types/habit";
import { useState } from "react";

interface AddHabitProps {
  setHabits: (n: (current: HabitProps[]) => HabitProps[]) => void;
  setIsAdding: (b: boolean) => void;
}

const AddHabit = ({ setHabits, setIsAdding }: AddHabitProps) => {
  const [newHabit, setNewHabit] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const addHabit = () => {
    const name = newHabit.trim();
    if (!name) return;
    setHabits((current) => [
      ...current,
      {
        id: Date.now(),
        name,
        detail: newDetail.trim() || "Daily habit",
        completed: false,
      },
    ]);
    setNewHabit("");
    setNewDetail("");
    setIsAdding(false);
  };
  return (
    <div className="habit-add mt-3 flex flex-col gap-2 rounded-2xl border border-[#111] bg-white p-2">
      <Input
        autoFocus
        value={newHabit}
        onChange={(event) => setNewHabit(event.target.value)}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.nativeEvent.isComposing &&
            event.keyCode !== 229
          )
            addHabit();
          if (event.key === "Escape") setIsAdding(false);
        }}
        placeholder="Name your new habit"
        className="w-full bg-transparent font-normal focus-visible:ring-0 border-none placeholder:text-[#aaa]"
      />
      <Separator />
      <Input
        value={newDetail}
        onChange={(event) => setNewDetail(event.target.value)}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.nativeEvent.isComposing &&
            event.keyCode !== 229
          )
            addHabit();
          if (event.key === "Escape") setIsAdding(false);
        }}
        placeholder="Add a detail (e.g. 20 minutes)"
        className="w-full bg-transparent font-light focus-visible:ring-0 border-none placeholder:text-[#aaa]"
      />
      <div className="flex justify-end gap-2 pt-1">
        <Button
          onClick={() => {
            setIsAdding(false);
            setNewHabit("");
            setNewDetail("");
          }}
          variant="ghost"
          className="rounded-xl px-2.5 text-xs font-semibold text-[#777771] transition-colors hover:bg-[#f1f1ef] hover:text-[#111]"
        >
          Cancel
        </Button>
        <Button
          onClick={addHabit}
          className="rounded-xl bg-[#111] px-2.5 text-xs font-semibold text-white transition-transform active:scale-95"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddHabit;
