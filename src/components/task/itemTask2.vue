<template>
  <q-expansion-item class="item q-my-sm shadow-1" switch-toggle-side expand-separator dense-toggle hide-expand-icon>
    <template v-slot:header>
      <q-item-section>
        <span class="text-subtitle1">{{ item.name }}</span>
        <span class="text-caption fntSm">Created : {{ new Date(item.createdAt).toLocaleString()
          }}</span>
        <span class="text-caption text-weight-light fntSm"> Responsible :{{ item.responsible }}</span>
      </q-item-section>
      <q-item-section top>
        <div class="jCol">
          <div class="jCol text-center q-mb-sm">
            <span class="text-caption fntSm">{{ new Date(item.startDate).toLocaleDateString() }}</span>
            <span class="text-caption fntSm">Initial date </span>
          </div>

          <div class="jCol text-center">
            <span class="text-caption fntSm"> {{ new Date(item.endDate).toLocaleDateString() }}</span>
            <span class="text-caption fntSm">Deadline </span>
          </div>
        </div>
      </q-item-section>
      <q-item-section side>
        <div class="row items-center">
          <q-btn size="1.5em" flat dense round :color="(item.done) ? 'green-5' : 'blue-3'"
            :icon="(item.done) ? 'check_circle' : 'radio_button_unchecked'" @click.stop="$emit('check', item)"></q-btn>
        </div>
      </q-item-section>
      <q-item-section side>
        <q-btn size="1em" flat dense round icon="more_vert">
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
      </q-item-section>
    </template>

    <q-card>
      <q-card-section>
        {{ item.description }}
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.item {}

.fntSm {
  font-size: 0.75em;
}
</style>
