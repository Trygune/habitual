import { HabitProps, HistoryProps } from "@/types/habit";
import { Dexie, type EntityTable } from "dexie";

const db = new Dexie("HabitualDatabase") as Dexie & {
  habits: EntityTable<HabitProps, "id">;
  history: EntityTable<HistoryProps, "id">;
};

db.version(1).stores({
  habits: "id",
  history: "id",
});

export { db };
