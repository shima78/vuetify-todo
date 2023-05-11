<script setup lang="ts">
import {ref, } from 'vue'
import {useTodoListsStore} from "@/store/useTodoListsStore";
const todoListsStore = useTodoListsStore()
const props = defineProps(["id", "title", "description", "edit"])
const emit = defineEmits(["addTodoList"])
const dialog = ref(false)
const todoList = ref({
  title: props.edit?props.title:'',
  description: props.edit?props.description:'',

})
console.log(props)
// eslint-disable-next-line vue/no-setup-props-destructure
const edit = props.edit
const save = () =>{
  if(edit){
    editTodoList(props.id, todoList.value.title, todoList.value.description)
  }
  else emit('addTodoList', todoList.value)
  dialog.value = false;
}

const editTodoList = (id, title, description)=>{
  todoListsStore.editTodoList(id, title, description)
}
</script>
<template>
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-if="edit"  v-bind="props" color="primary" >
          edit
        </v-btn>
        <v-btn v-else prepend-icon="mdi-plus" v-bind="props" color="green" class="text-white">
          Add todo list
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span v-if="props.id">Edit Todo List</span>
          <span v-else class="text-h5 mt-4">Add New Todo List</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Title*"
                  type="text"
                  v-model="todoList.title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description*"
                  type="text"
                  v-model="todoList.description"
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
