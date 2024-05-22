<script setup>
import FormView from './components/FormView.vue'
import ListView from './components/ListView.vue'
import XmlView from './components/XmlView.vue'
import { ref } from 'vue'
import useRecord from './composables/useRecord';
const {addNewRecord} = useRecord();
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
    <button @click="addNewRecord">Add Record</button>
    <FormView v-if="currentView==='form'" />
    <ListView v-else-if="currentView==='list'" />
    <XmlView v-else-if="currentView==='xml'" />
  </main>
</template>

<style scoped></style>
