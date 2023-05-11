import {TodoItem} from "@/types/TodoItem";

export type TodoList = {
  id: string;
  title: string;
  description: string;
  creationDate : string;
  items: Array<TodoItem>
};
