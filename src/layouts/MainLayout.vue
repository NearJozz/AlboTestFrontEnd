<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          To Do App
        </q-toolbar-title>

        <div>Version 1.0.0</div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MainLayout',
  components: {
  },
  setup() {
  }

})
</script>
<style>
.jRow {
  display: flex;
  flex-direction: row;
}

.jCol {
  display: flex;
  flex-direction: column;
}
</style>
