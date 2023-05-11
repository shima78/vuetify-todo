<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import {useTodoListsStore} from "@/store/useTodoListsStore";
import {useRoute} from 'vue-router';
const todoListsStore = useTodoListsStore()
import CreateTodoListItem from "@/components/createTodoListItem.vue";
const props = defineProps(['todolist'])
const sortBy= ref([{ key: 'calories', order: 'asc' }])
const headers = ref( [
  {
    title: 'title',
    align: 'start',
    sortable: true,
    key: 'title',
  },
  { title: 'description', key: 'description' },
  { title: 'due date', key: 'due' },
  { title: 'priority', key: 'priority' },
  { title: 'Actions', key: '', sortable: false},
])
const selectedHeaders = ref( [
  {
    title: 'title',
    align: 'start',
    sortable: true,
    key: 'title',
  },
  { title: 'description', key: 'description' },
  { title: 'due date', key: 'due' },
  { title: 'priority', key: 'priority' },
  { title: 'Actions', key: '', sortable: false},
])
const addTodoListItem = (todo)=>{
  todoListsStore.addTodoListItem(props.todolist.id,todo)
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
      </v-data-table>
    </v-card-item>


  </v-card>

</template>

<style scoped>

</style>
