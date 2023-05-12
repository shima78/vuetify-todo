<script setup lang="ts">
import CardTodoTable from "@/components/CardTodoTable.vue";
import {useTodoListsStore} from "@/store/useTodoListsStore";
import {useRoute} from 'vue-router';
const route = useRoute()
const todoListsStore = useTodoListsStore()


</script>
<template>
  <card-todo-table :todolist="todoListsStore.getTodoListById(route.params.id.toString())"/>
</template>

<style scoped>

</style>
