<script setup lang="ts">
import {ref, } from 'vue'
const props = defineProps(["id", "todo", "edit"])
const emit = defineEmits(["addTodoItem", "removeTodoItem"])
const dialog = ref(false)
// eslint-disable-next-line vue/no-setup-props-destructure
const edit = props.edit
const todo = ref({
  title:props.edit?props.todo.title: '',
  description:props.edit?props.todo.description: '',
  due: props.edit?props.todo.due: '',
  priority: props.edit?props.todo.priority: 0,
  completed: props.edit?props.todo.complete: false
})
const save = () =>{
  if(edit){
    emit('editTodoItem',props.id, todo.value)
  }
  else emit('addTodoItem', todo.value)
  dialog.value = false;
}

// const editTodoList = (id, title, description)=>{
//   todoListsStore.editTodoList(id, title, description)
// }
</script>
<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="1024"
  >
    <template v-slot:activator="{ props }">
      <v-btn v-if="edit" v-bind="props" icon="mdi-pencil" size="small" class="text-blue"></v-btn>
      <v-btn v-else prepend-icon="mdi-plus" v-bind="props" color="green" class="text-white">
        Add Todo Item
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span v-if="props.id">Edit Todo Item</span>
        <span v-else class="text-h5 mt-4">Add New Todo Item</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Title*"
                type="text"
                v-model="todo.title"
                required
              ></v-text-field>
              <v-text-field
                label="due*"
                type="date"
                v-model="todo.due"
                required
              ></v-text-field>
              <v-text-field
                label="priority*"
                type="number"
                v-model="todo.priority"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Description*"
                type="text"
                v-model="todo.description"
                required
              ></v-textarea>
            </v-col>

          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          variant="text"
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
<style scoped>

</style>
