<script setup>
import FormView from './components/FormView.vue'
import ListView from './components/ListView.vue'
import XmlView from './components/XmlView.vue'
import { ref, computed } from 'vue';
import useRecord from './composables/useRecord';
// import useTemplates from '@/composables/useTemplates';
import useModal from '@/composables/useModal'

const currentView = ref('form')
const {currentModal} = useModal();
const { eligibilityList, addNewRecord } = useRecord();

const updateView = function(view) {
  currentView.value = view
}
const tabStyles = computed(() => {
  const tab = currentView.value;
  const styles = {
    form: 'color: #dedede;',
    list: 'color: #dedede;',
    xml: 'color: #dedede;',
  }
  if(eligibilityList.value.length) {
    styles[tab] = 'color: red'
  }
  return styles;
})
</script>

<template>
  <nav v-if="!currentModal">
    <ul>
      <li @click="updateView('form')" :style="tabStyles['form']">Form</li>
      <li @click="updateView('list')" :style="tabStyles['list']">Summary</li>
      <li @click="updateView('xml')"  :style="tabStyles['xml']">XML</li>
    </ul>
    <button
      @click="addNewRecord"
      id="record-button"
      style="z-index: 2;"
    >
      +
    </button>
  </nav>
  <main>
    <div id="records" v-if="eligibilityList.length">
      <div
        id="form"
      >
        <FormView v-if="currentView==='form'" />
        <ListView
          v-else-if="currentView==='list'"
          @form="updateView('form')"
        />
        <XmlView v-else-if="currentView==='xml'" />
      </div>
    </div>
    <div id="no-records" v-else style="margin-top: 10svh;">
      <p>No Records Yet, Add Record to start</p>
    </div>
    
  </main>
</template>
<style scoped>
  #record-button {
	position: fixed;
	top: 2%;
	border-radius: 50%;
	background-color: lightgreen;
	font-size: larger;
	margin-left: 50svw;
	padding: 10px 15px;
  color: black;
}
</style>