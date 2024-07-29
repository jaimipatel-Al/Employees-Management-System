<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  isBack: {
    default: true
  },
  isNext: {
    default: true
  }
})

const emit = defineEmits(['previousStep', 'nextStep', 'submit'])

const router = useRouter()

const goToList = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="d-flex justify-space-between flex-wrap ga-4 pt-8">
    <div>
      <v-btn @click="goToList"> Back To List </v-btn>
    </div>
    <div class="d-flex ga-3 flex-wrap">
      <v-btn v-if="isBack" prepend-icon="mdi-chevron-left" @click="emit('previousStep')">
        Back
      </v-btn>
      <v-btn v-if="isNext" append-icon="mdi-chevron-right" @click="emit('nextStep')"> Next </v-btn>
      <v-btn v-if="!isNext" @click="emit('submit')"> Add Employee </v-btn>
    </div>
  </div>
</template>
