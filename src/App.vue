<template>
  <notifications position="middle center" duration="-1" classes="text-lg mb-2 bg-teal-lighten-4 py-4 px-2 rounded-lg"></notifications>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {notify} from "@kyvg/vue3-notification";
import {getTodayTodos} from '@/composables/useUpcomingTodos'
import {useTodoListsStore} from "@/store/useTodoListsStore";
const todoListsStore = useTodoListsStore()
onMounted(()=>{
  todoListsStore.initFromLocalStorage()
  const notifs = getTodayTodos()
  notifs.forEach((notif)=>{
    notify({
      title:`Upcoming: ${notif.title}`,
      text: notif.description,
      type: 'info'
    }, );
  })


})
</script>
