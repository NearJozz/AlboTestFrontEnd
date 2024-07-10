<template>
  <q-card class="jCol q-pa-sm base">
    <h5 class="q-my-none">Create Task</h5>
    <q-form class="jForm" ref="myForm">
      <q-input class="q-my-sm" dense type="text" v-model="form.name" label="Name" stac />
      <q-input class="q-my-sm" dense type="textarea" v-model="form.description" label="Description" stack />
      <q-input class="q-my-sm" dense type="email" v-model="form.responsible" label="Responsible email" stack />
      <span class="text-caption q-my-sm" v-if="typeof (range) == 'object'">from: {{ range.from }} to:
        {{ range.to }}</span>
      <span class="text-caption q-my-sm" v-else>Initial Date: {{ range }}</span>
      <div class="jRow flex-center">
        <q-date flat class="q-my-sm " dense v-model="range" range minimal />
      </div>
      <div class="jRow q-my-sm">
        <div class="jCol"><q-btn label="cancel" color="red-5" size="md" @click.prevent="cancel"></q-btn></div>
        <q-space></q-space>
        <div class="jCol"><q-btn label="save" size="md" color="green-5" @click.prevent="save"></q-btn></div>
      </div>
    </q-form>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
export default defineComponent({
  name: 'IndexPage',
  components: {},
  props: {
    contextForm: { type: Object, required: false }
  },
  watch: {
    contextForm: {
      handler(newVal) {
        this.setContext(newVal)
      },
    }
  },
  data() {
    return {
      form: {
        UUID: null,
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        responsible: "",
      },
      range: "",
      title: "Create Task"
    }
  },
  methods: {
    quita() {
      console.log(this.range)
      this.validate()
    },
    async validate() {
      let valid = await this.$refs.myForm.validate()
      if (valid) {
        let calc = this.calcRangeOutput;
        let nOut = { ...this.form }
        nOut.startDate = calc.startDate;
        nOut.endDate = calc.endDate;
        return nOut;
      } else {
        return null
      }
    },
    clearContext() {
      this.title = "Create Task"
      this.form = {
        UUID: null,
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        responsible: "",
      }
      this.range = ""
    },
    setContext(item) {
      this.title = "Edit task"
      this.form = {
        UUID: item.UUID,
        name: item.name,
        description: item.description,
        startDate: item.startDate,
        endDate: item.endDate,
        responsible: item.responsible,
      },
        this.calcRangeInput(item)
    },
    getContext() {
      let range = this.calcRangeOutput()
      this.form.startDate = range.start;
      this.form.endDate = range.end;
      return this.form;
    },
    calcRangeInput(item) {
      if (item.startDate != undefined && item.endDate != undefined) {
        this.range = {}
        this.range.from = date.formatDate(item.startDate, 'YYYY/MM/DD'),
          this.range.to = date.formatDate(item.endDate, 'YYYY/MM/DD')

        console.log(date.formatDate(item.startDate, 'YYYY/MM/DD'))
        console.log(date.formatDate(item.endDate, 'YYYY/MM/DD'))
        console.log(this.range)
      } else {
        this.range = date.formatDate(item.startDate, 'YYYY/MM/DD')
      }
    },
    calcRangeOutput() {
      if (typeof (this.range) == 'object') {
        let start = date.extractDate(this.range.from, 'YYYY/MM/DD')
        let end = date.extractDate(this.range.to, 'YYYY/MM/DD')
        return { start: start.toISOString(), end: end.toISOString() }
      } else {
        let start = date.extractDate(this.range, 'YYYY/MM/DD')
        return { start: start.toISOString(), end: start.toISOString() }
      }
    },
    cancel() {
      this.clearContext()
      this.$emit('cancelFx')
    },
    save() {
      this.validate()
        .then((resp) => {
          if (resp) {
            this.$emit('saveFx', this.getContext())
            this.clearContext();
          } else {
            console.log("validation form fail")
          }
        })
    }

  },
  mounted() {
    if (this.contextForm != null) {
      if (Object.keys(this.contextForm).length != 0) {
        console.log(this.contextForm)
        this.setContext(this.contextForm)
        console.log(this.range)
      }
    }

  }
})
</script>
<style scoped>
.base {
  width: 100%;
  height: 100vh;
  align-items: center;
  overflow: auto;
}

.jForm {
  width: 90%;
  height: 90%;
}
</style>
