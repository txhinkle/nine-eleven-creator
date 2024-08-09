<script setup>
import FormView from './components/FormView.vue'
import ListView from './components/ListView.vue'
import XmlView from './components/XmlView.vue'
import { ref } from 'vue'
const currentView = ref('form')

const updateView = function(view) {
  currentView.value = view
}
</script>

<template>
  <nav>
    <ul>
      <li @click="updateView('form')">Form</li>
      <li @click="updateView('list')">List</li>
      <li @click="updateView('xml')">XML</li>
    </ul>
  </nav>
  <main>
    <FormView v-if="currentView==='form'" />
    <ListView
      v-else-if="currentView==='list'"
      @form="updateView('form')"
    />
    <XmlView v-else-if="currentView==='xml'" />
  </main>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0%;
  left: 0%;
  padding: 5% 0 0 5%;
  background-color: rgb(240, 235, 242, 5);
  width: 100%;
}
</style>
