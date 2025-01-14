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
  <footer>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
  </footer>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0%;
  left: 0%;
  padding: 5% 0 0 5%;
  background-color: rgb(240, 235, 242, 1);
  width: 100%;
  z-index: 2;
}

li {
  padding: 0 3px 0 3px;
}
</style>
