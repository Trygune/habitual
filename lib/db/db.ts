import { HabitProps, HistoryProps } from "@/types/habit";
import { UserSettings } from "@/types/user";
import { Dexie, type EntityTable } from "dexie";

const db = new Dexie("HabitualDatabase") as Dexie & {
  habits: EntityTable<HabitProps, "id">;
  history: EntityTable<HistoryProps, "id">;
  settings: EntityTable<UserSettings, "id">;
};

db.version(1).stores({
  habits: "id",
  history: "id",
  settings: "id",
});

export { db };
