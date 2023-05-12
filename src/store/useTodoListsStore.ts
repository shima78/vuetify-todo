import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import {TodoList} from "@/types/TodoList";
import {TodoItem} from "@/types/TodoItem";



export const useTodoListsStore = defineStore("todoLists", () => {
  const todoLists: Ref<TodoList[]> = ref([]);
  const lsKey = "todoLists";

  function initFromLocalStorage() {
    const lsTodoLists = localStorage.getItem(lsKey);

    if (lsTodoLists === null) {
      todoLists.value = [];
    } else {
      try {
        todoLists.value = JSON.parse(lsTodoLists);
      } catch (e) {
        todoLists.value = [];
      }
    }
    updateLocalStorage();
  }

  function updateLocalStorage() {
    localStorage.setItem(lsKey, JSON.stringify(todoLists.value));
  }

  function addTodoList(todolist: {
    title: string,
    description: string
  }) {
    todoLists.value = [
      ...todoLists.value,
      {
        id: nanoid(),
        title: todolist.title,
        description: todolist.description,
        creationDate: new Date().toString(),
        items : []
      },
    ];
    updateLocalStorage();
  }

  function addTodoListItem(id:string,todolistItem: {
    title: string,
    description: string,
    due:string,
    priority:number
  }) {
    todoLists.value.forEach((todoList) => {
      if (todoList.id === id) {
        console.log(todoList.items)
        todoList.items.push({
          id: nanoid(),
          title: todolistItem.title,
          description: todolistItem.description,
          due: todolistItem.due,
          priority: todolistItem.priority,
          complete: false
        })
      }
    });
    updateLocalStorage();
  }

  function removeTodoListItem(id:string,todoId:string) {
    todoLists.value.forEach((todoList) => {
      if (todoList.id === id) {
        const itemIndex = todoList.items.findIndex((item) => item.id === todoId);
        if (itemIndex > -1) {
          todoList.items.splice(itemIndex, 1);
        }
      }
    });
    updateLocalStorage();
  }

  function editTodoListItem(id:string, todo:TodoItem) {
    todoLists.value.forEach((todoList) => {
      if (todoList.id === id) {
        const itemIndex = todoList.items.findIndex((item) => item.id === todo.id);
        if (itemIndex > -1) {
          todoList.items[itemIndex] = todo;
        }
      }
    });
    updateLocalStorage();
  }

  function removeTodoList(id: string) {
    todoLists.value = todoLists.value.filter((todoList) => todoList.id !== id);
    updateLocalStorage();
  }

  function editTodoList(id:string, title: string, description: string) {
    todoLists.value.forEach((todoList) => {
      if (todoList.id === id) {
        todoList.title = title;
        todoList.description = description;
      }
    });
    updateLocalStorage();
  }

  function getTodoListById(id:string):TodoList | void{
    todoLists.value.forEach((todoList) => {
      if (todoList.id === id) {
        return todoList
      }
    });

  }

  return {
    todoLists,
    addTodoList,
    removeTodoList,
    initFromLocalStorage,
    addTodoListItem,
    removeTodoListItem,
    editTodoListItem,
    updateLocalStorage,
    getTodoListById,
    editTodoList,
  };
});

