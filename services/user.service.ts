import { db } from "@/lib/db/db";
import type { UserSettings } from "@/types/user";

export const getUserSettings = async (): Promise<UserSettings | undefined> => {
  return db.settings.get("user");
};

export const saveUserName = async (name: string): Promise<void> => {
  await db.settings.put({
    id: "user",
    name,
  });
};

export const deleteUserSettings = async (): Promise<void> => {
  await db.settings.delete("user");
};
