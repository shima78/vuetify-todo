<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import {useTodoListsStore} from "@/store/useTodoListsStore";
const todoListsStore = useTodoListsStore()
import CreateTodoListItem from "@/components/createTodoListItem.vue";
import TodoList from "@/views/TodoList.vue";
import {fi} from "vuetify/locale";
const props = defineProps(['todolist'])
const selectItems = ref( [
  {
    title: 'Title',
    align: 'start',
    sortable: true,
    key: 'title',
  },
  { title: 'Description', key: 'description' },
  { title: 'Due date', key: 'due' },
  { title: 'Priority', key: 'priority' },
])
const selectedHeaders = ref( [
  {
    title: 'Title',
    align: 'start',
    sortable: true,
    key: 'title',
    filter: f => { return ( f + '' ).toLowerCase().includes( this[ 'name' ].toLowerCase() ) }
  },
  { title: 'Description', key: 'description' },
  { title: 'Due date', key: 'due' },
  { title: 'Priority', key: 'priority' },
  { title: 'Complete', key: 'complete', sortable: false },
  { title: 'Actions', key: 'id', sortable: false},
])

const addTodoListItem = (todo)=>{
  todoListsStore.addTodoListItem(props.todolist.id,todo)
  resetfilters()
}
const removeTodoListItem = (todoId)=>{
  todoListsStore.removeTodoListItem(props.todolist.id,todoId)
  resetfilters()

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
  resetfilters()

}
const toggleTodoListItem = (todoId)=>{
  todoListsStore.toggleTodoListItem(props.todolist.id, todoId)
  resetfilters()

}
const filter =ref({
  title: '',
  description : '',
  due: '',
  complete : null,
  priority : null,
})
const filteredItems = ref([])
onMounted(()=> {
  console.log(props.todolist)
  filteredItems.value = [...props.todolist.items]
})
const onFilter = ()=>{
    if(filter.value.complete!=null) {
      filteredItems.value = props.todolist.items.filter(item =>item.complete === filter.value.complete)
    }
    if(filter.value.priority!=null){
      filteredItems.value = [...filteredItems.value.filter(item =>parseInt(item.priority) > parseInt(filter.value.priority))]
    }
  console.log(filteredItems.value)
}
const resetfilters = () =>{
  filteredItems.value = [...props.todolist.items]
  filter.value = {
    title: '',
    description : '',
    due: '',
    complete : null,
    priority : null,
  }
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
    <v-row no-gutters align="start" class="px-4 mb-4">
      <create-todo-list-item  :edit="false" @add-todo-item="addTodoListItem"/>
    </v-row>
    <v-card-item class="w-50">
      <v-select v-model="selectedHeaders" :items="selectItems" label="Select Columns" multiple outlined return-object>
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2">
            <span>{{ item.title }}</span>
          </v-chip>
          <span v-if="index === 2" class="grey--text caption">(+{{ selectedHeaders.length - 2 }} others)</span>
        </template>
      </v-select>
    </v-card-item>

    <v-card-item>
      <v-row >
        <v-col v-for="(col,index) in selectedHeaders" :key="index">
          <v-switch @change="onFilter" v-model="filter.complete"  v-if="col.title=== 'Complete'" color="success"></v-switch>
          <v-text-field
            class="mt-1 ml-0"
            v-else-if="col.title==='Title'" type="text" ></v-text-field>
          <v-text-field
            class="mt-1 ml-0"
            v-else-if="col.title==='Description'" type="text" ></v-text-field>
          <v-text-field
            class="mt-1 ml-0"
            v-else-if="col.title==='Due date'" type="date" ></v-text-field>
          <v-text-field
            class="mt-1 ml-0"
            v-else-if="col.title==='Priority'" @change="onFilter" v-model="filter.priority"  type="number" label="higher than"></v-text-field>
          <v-btn v-else
            class="mt-1 ml-0"
            @click="resetfilters" >Reset Filters
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="selectedHeaders"
        :items="filteredItems"
        multi-sort
        :items-per-page="5"
        class="elevation-1"
      >

        <template v-slot:item="{item}">

          <tr>
            <td v-for="(col,index) in selectedHeaders" :key="index" :class="{'bg-green-accent-1': item.columns.complete}">
              <span v-if="col.title=== 'Complete'">
               <v-checkbox
                 v-model="item.columns.complete"
                 color="success"
                 @change="toggleTodoListItem(item.columns.id)"
                 hide-details
               ></v-checkbox>
              </span>
              <span v-else-if="col.title !== 'Actions'">
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
