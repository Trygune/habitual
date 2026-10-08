import { db } from "@/lib/db/db";
import type { HistoryProps } from "@/types/habit";

export const getHistory = async (
  id: number,
): Promise<HistoryProps | undefined> => {
  return db.history.get(id);
};

export const createHistory = async (history: HistoryProps): Promise<number> => {
  return db.history.add(history);
};

export const updateHistory = async (history: HistoryProps): Promise<number> => {
  return db.history.update(history.id, history);
};

export const getHistories = async (
  startId: number,
  endId: number,
): Promise<HistoryProps[]> => {
  return db.history.where("id").between(startId, endId, true, true).toArray();
};
