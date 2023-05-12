<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import {useTodoListsStore} from "@/store/useTodoListsStore";
import {useRoute} from 'vue-router';
const todoListsStore = useTodoListsStore()
import CreateTodoListItem from "@/components/createTodoListItem.vue";
const props = defineProps(['todolist'])
const headers = ref( [
  {
    title: 'Title',
    align: 'start',
    sortable: true,
    key: 'title',
  },
  { title: 'Description', key: 'description' },
  { title: 'Due date', key: 'due' },
  { title: 'Priority', key: 'priority' },
  { title: 'Complete', key: 'complete' },
  { title: 'Actions', key: 'id', sortable: false},
])
const selectedHeaders = ref( [
  {
    title: 'Title',
    align: 'start',
    sortable: true,
    key: 'title',
  },
  { title: 'Description', key: 'description' },
  { title: 'Due date', key: 'due' },
  { title: 'Priority', key: 'priority' },
  { title: 'Complete', key: 'complete' },
  { title: 'Actions', key: 'id', sortable: false},
])

const addTodoListItem = (todo)=>{
  todoListsStore.addTodoListItem(props.todolist.id,todo)
}
const removeTodoListItem = (todoId)=>{
  todoListsStore.removeTodoListItem(props.todolist.id,todoId)
}
const editTodoListItem = (todoId:string, todo)=>{
  const myTodo = {
    id: todoId,
    title: todo.title,
    description: todo.description,
    due: todo.due,
    priority: todo.priority,
    complete: todo.complete,
  }
  todoListsStore.editTodoListItem(props.todolist.id, myTodo)
}
</script>
<template>
  <v-card
    class="mx-4 mb-12 mt-8"

  >
    <v-card-item
      class="align-end text-white bg-light-blue-accent-4"
      height="200"
      cover
    >
      <v-card-title>{{ props.todolist.title }}</v-card-title>
    </v-card-item>
    <v-card-subtitle class="pt-4">
      {{ props.todolist.creationDate }}
    </v-card-subtitle>

    <v-card-text>
      <div>{{props.todolist.description}}</div>

      <div></div>
    </v-card-text>
    <v-row no-gutters align="start" class="px-8 mb-4">
      <create-todo-list-item  :edit="false" @add-todo-item="addTodoListItem"/>
    </v-row>
    <v-card-item class="w-50">
      <v-select v-model="selectedHeaders" :items="headers" label="Select Columns" multiple outlined return-object>
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2">
            <span>{{ item.title }}</span>
          </v-chip>
          <span v-if="index === 2" class="grey--text caption">(+{{ selectedHeaders.length - 2 }} others)</span>
        </template>
      </v-select>
    </v-card-item>

    <v-card-item>
      <v-data-table
        :headers="selectedHeaders"
        :items="props.todolist.items"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item="{item}">
          <tr>
            <td v-for="(col,index) in selectedHeaders" :key="index">
              <span v-if="col.title !== 'Actions'">
                {{ item.columns[col.key] }}

              </span>
              <span v-else>
                <create-todo-list-item :id="item.columns.id" :todo="item.columns" :edit="true" @edit-todo-item="editTodoListItem"/>
                <v-btn icon="mdi-delete" size="small" class="text-red ml-2" @click="removeTodoListItem(item.columns.id)"></v-btn>
              </span>
            </td>

          </tr>
        </template>
      </v-data-table>
    </v-card-item>


  </v-card>

</template>

<style scoped>

</style>
