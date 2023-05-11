<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import {useTodoListsStore} from "@/store/useTodoListsStore";
import CreateTodoListForm from "@/components/CreateTodoListForm.vue";
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

])

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
      <create-todo-list-item :todo="todolist" :edit="false"/>
    </v-row>

    <v-card-item>
      <v-data-table
        :headers="headers"
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
