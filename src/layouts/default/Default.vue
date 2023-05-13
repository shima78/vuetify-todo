<template>
  <v-card  class="mt-12 mx-0 p-0 justify-center align-center " flat>
    <v-layout>
      <v-app-bar
        color="teal-darken-4 "
        image="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>


        <v-app-bar-title>Journey Hero Todo App</v-app-bar-title>

        <v-btn icon @click="router.replace('/')">
          <v-icon>mdi-home</v-icon>
        </v-btn>

      </v-app-bar>
      <v-main class="mb-12 mr-0 "

      >
        <router-view/>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
//
import router from "@/router";
</script>
