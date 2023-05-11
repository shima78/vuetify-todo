<template>
  <v-row no-gutters align="start" class="px-8 mb-4">
    <create-todo-list-form @add-todo-list="addTodoList"/>
  </v-row>

  <v-row no-gutters align="center" class="px-4">
    <v-col
      v-for="todoList in todoLists"
      :key="todoList.id"
      cols="12"
      md="3"
    >
      <card-todo-list :todolist="todoList"  @delete-todo-list="deleteTodoList"/>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import CardTodoList from "@/components/CardTodoList.vue";
import CreateTodoListForm from "@/components/CreateTodoListForm.vue";
import {useTodoListsStore} from "@/store/useTodoListsStore";
import { storeToRefs } from "pinia";
import {onMounted} from 'vue'
const todoListsStore = useTodoListsStore()

const { todoLists } = storeToRefs(todoListsStore);
onMounted(()=>{
  todoListsStore.initFromLocalStorage()
})
const addTodoList = (todolist) =>{
  todoListsStore.addTodoList(todolist)
}
const deleteTodoList = (id) =>{
  console.log("delte")
  todoListsStore.removeTodoList(id)
}
</script>
