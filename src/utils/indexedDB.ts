import { openDB } from 'idb';
import type { DBSchema } from 'idb';

interface Task {
  id: number;
  description: string;
}

interface MyDB extends DBSchema {
  tasks: {
    key: number;
    value: Task;
  };
}

const DB_NAME = 'offline-tasks-db';
const STORE_NAME = 'tasks';
const DB_VERSION = 1;

export async function getDB() {
  return openDB<MyDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function addTask(task: Task) {
  const db = await getDB();
  await db.add(STORE_NAME, task);
}

export async function getAllTasks(): Promise<Task[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function clearTasks() {
  const db = await getDB();
  await db.clear(STORE_NAME);
}
