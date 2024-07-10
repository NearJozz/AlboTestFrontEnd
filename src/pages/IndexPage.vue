<template>
  <div class="jCol q-pa-sm base q-mx-auto">
    <div class="jRow q-mb-sm">
      <q-space></q-space>
      <q-btn icon="add" round color="green-6" @click="viewForm = !viewForm"></q-btn>
    </div>
    <q-list bordered class="rounded-borders">
      <q-scroll-area :style="{ height: '80vh' }">
        <itemTask v-for="(item, i) in todoStore.todoList" :item="item" :key="i" @editFx="selectToEdit"
          @deleteFx="selectToDelete" @check="selectToCheck">
        </itemTask>
      </q-scroll-area>
    </q-list>
  </div>
  <q-dialog v-model="viewForm" backdrop-filter="blur(4px)" maximized="true" persistent no-shake>
    <formTask :contextForm="selectContext" @cancelFx="cancel" @saveFx="save"></formTask>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import itemTask from 'components/task/itemTask2.vue'
import formTask from 'components/task/formTask.vue'
import { useTodoStore } from 'src/stores/todo-store'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'ToDoList',
  components: {
    itemTask,
    formTask
  },
  setup() {
    let todoStore = useTodoStore();
    let $q = useQuasar()
    let showNotification = (message, type) => {
      $q.notify({
        message: message,
        type: type
      })
    }
    return { todoStore, showNotification }
  },
  data() {
    return {
      viewForm: false,
      selectContext: null
    }
  },
  methods: {
    cancel() {
      this.viewForm = false;
    },
    save(item) {
      this.viewForm = false;
      this.selectContext = null;
      console.log('saved Item', item)
      if (item.UUID == undefined) {
        this.todoStore.POST_ToDoList(item)
          .then(() => {
            this.showNotification("The task was successfully added", "positive")
          })
          .catch((err) => {
            this.showNotification("An error occurred while completing the transaction", "negative")
          })
      } else {
        this.todoStore.PUT_ToDoList(item.UUID, item)
          .then(() => {
            this.showNotification("The task was successfully updated", "positive")
          })
          .catch((err) => {
            this.showNotification("An error occurred while completing the transaction", "negative")
          })
      }
    },
    selectToEdit(item) {
      this.selectContext = item
      this.viewForm = true;
    },
    selectToDelete(item) {
      console.log("delete", item)
      this.todoStore.DELETE_ToDoList(item.UUID)
        .then(() => {
          this.showNotification("The task was successfully deleted", "positive")
        })
        .catch((err) => {
          this.showNotification("An error occurred while completing the transaction", "negative")
        })
    },
    selectToCheck(item) {
      item.done = !item.done
      this.todoStore.PATCH_ToDoList(item.UUID, { done: item.done })
        .then(() => {
          this.showNotification("The task status was updated correctly", "positive")
        })
        .catch((err) => {
          this.showNotification("An error occurred while completing the transaction", "negative")
        })
    }
  },
  async mounted() {
    try {
      await this.todoStore.GET_ToDoList()
    } catch (err) {
      this.showNotification("An error occurred while load the view", "negative")
    }
  }
})
</script>
<style scoped>
.base {
  max-width: 800px;
}
</style>
