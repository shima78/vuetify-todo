<script setup lang="ts">
import {TodoList} from "@/types/TodoList";
import {defineProps} from 'vue'
import CreateTodoListForm from "@/components/CreateTodoListForm.vue";

const emit = defineEmits(["delete-todo-list"])
const props = defineProps([
  "todolist"
])

</script>

<template>
  <v-card
    class="mx-4 mb-12 "

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

    <v-card-actions>
      <v-btn
        @click="$router.push({ name: 'TodoList' })"
        color="blue">
        view
      </v-btn>

      <create-todo-list-form :id="props.todolist.id" :edit="true"
                             :description="props.todolist.description"
                             :title="props.todolist.title"
      />

      <v-btn
        color="red"
        @click="emit('delete-todo-list', props.todolist.id)"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
