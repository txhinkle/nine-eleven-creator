<script setup>
import FormView from './components/FormView.vue'
import ListView from './components/ListView.vue'
import XmlView from './components/XmlView.vue'
import { ref } from 'vue';
import HOHRelationshipModal from './components/HOHRelationshipModal.vue';
// import useTemplates from '@/composables/useTemplates';
import useModal from '@/composables/useModal'

const currentView = ref('form')
const {currentModal} = useModal();
const updateView = function(view) {
  currentView.value = view
}
</script>

<template>
  <nav v-if="!currentModal">
    <ul>
      <li @click="updateView('form')">Form</li>
      <li @click="updateView('list')">Summary</li>
      <li @click="updateView('xml')">XML</li>
    </ul>
  </nav>
  <main>
    <div
      id="form"
      v-if="!currentModal"
    >
      <FormView v-if="currentView==='form'" />
      <ListView
        v-else-if="currentView==='list'"
        @form="updateView('form')"
      />
      <XmlView v-else-if="currentView==='xml'" />
    </div>
    <div
      id="modal"
      v-else
    >
      <HOHRelationshipModal
        v-if="currentModal.name === 'MemberRelationshipToHoh'"
        :relationship="currentModal.object"
        :edit="currentModal.edit"
      />
    </div>
    
  </main>
</template>
