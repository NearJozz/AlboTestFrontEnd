<template>
  <div class="jRow item q-my-sm" :style="(expanded) ? { height: 'auto' } : { height: '180px' }">
    <div class="jCol area1 " :class="(calcHeight && !expanded) ? 'inset-shadow-down' : ''">
      <div class="jRow">
        <div class="jRow q-my-md q-ml-sm" @click="expanded = !expanded">
          <q-icon :name="(expanded) ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" size="sm" v-if="calcHeight"></q-icon>
        </div>
        <span class="text-weight-medium q-pa-sm">{{ item.name }}</span>
      </div>
      <div class="jCol q-ml-sm">
        <span class="text-caption fontSm text-weight-thin q-ma-none">Created:</span>
        <span class="text-caption fontSm text-weight-thin q-ma-none">{{ new Date(item.createdAt).toLocaleString()
          }}</span>
      </div>

      <span class="text-caption text-weight-light q-pa-sm" :ref="(dom) => textArea = dom">{{ item.description }}</span>
    </div>
    <q-separator vertical />
    <div class="jCol area2 q-pa-sm" :style="(expanded) ? { justifyContent: 'start' } : {}">
      <div class="jCol">
        <span class="text-caption ">Initial date: </span>
        <span class="text-caption ">{{ new Date(item.startDate).toLocaleDateString() }}</span>
        <span class="text-caption ">Deadline:</span>
        <span class="text-caption "> {{ new Date(item.endDate).toLocaleDateString() }}</span>
      </div>
      <div class="jCol">
        <span class="text-caption text-weight-light ">Responsible</span>
        <span class="text-caption text-weight-light ">{{ item.responsible }}</span>
      </div>
    </div>
    <div class="jCol area3 q-ml-auto" :style="(expanded) ? { justifyContent: 'start' } : {}">
      <div class="jCol q-mx-sm q-pa-sm actionBtn">
        <span class="q-my-none text-caption">Done:</span>
        <q-btn size="1.5em" flat dense round :color="(item.done) ? 'green-5' : 'blue-3'"
          :icon="(item.done) ? 'check_circle' : 'radio_button_unchecked'" @click.stop="$emit('check', item)"></q-btn>
      </div>
      <div class="jCol q-mx-sm q-pa-sm actionBtn">
        <q-btn size="1.5em" flat dense round icon="more_vert">
          <q-menu fit>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup @click="$emit('editFx', item)">
                <q-icon class="q-mx-sm" color="warning" name="edit" size="sm"></q-icon>
                <q-item-section>Edit</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="$emit('deleteFx', item)">
                <q-icon class="q-mx-sm" color="red" name="delete" size="sm"></q-icon>
                <q-item-section>delete</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>



    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'itemTask',
  components: {},
  props: {
    item: { type: Object, required: true }
  },
  data() {
    return {
      expanded: false,
      textArea: null
    }
  },
  computed: {
    calcHeight() {
      if (this.textArea == null) return false;
      let area = this.textArea.getBoundingClientRect()
      if (area.height > 120) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {

  },
  mounted() {
    console.log()
  }
})
</script>
<style scoped>
.item {
  /* align-items: center; */
  overflow: hidden;
  border: 0.1em solid rgb(200, 200, 200);
  border-radius: 1em;

}

.area1 {
  width: 50%;
}

.area2 {
  width: 25%;
  justify-content: space-around;
}

.area3 {
  width: 25%;
  justify-content: space-around;
  align-items: center;
}

.actionBtn {
  width: 50px;
}

.fontSm {
  font-size: 0.75em;
}
</style>
