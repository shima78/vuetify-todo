<script setup lang="ts">
import CardTodoTable from "@/components/CardTodoTable.vue";
import {onMounted, ref} from "vue";
import {useTodoListsStore} from "@/store/useTodoListsStore";
import {useRoute} from 'vue-router';
import {storeToRefs} from "pinia";
const route = useRoute()
const todoListsStore = useTodoListsStore()
const todoList = ref({})
const { todoLists } = storeToRefs(todoListsStore);
onMounted(()=>{
  todoList.value = todoLists.value.filter(list => list.id == route.params.id.toString())[0]
})
</script>
<template>
  <card-todo-table :todolist="todoList"/>
</template>

<style scoped>

</style>
