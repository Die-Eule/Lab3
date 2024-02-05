import { createEvent, createStore } from "effector";

export type Inputs = {
  task: string
  taskDescription: string
  joined: string
}

export const $taskList = createStore<Inputs[]>([]);

export const addTask = createEvent();

$taskList
  .on(addTask, (list, item) => [...list, item]);
