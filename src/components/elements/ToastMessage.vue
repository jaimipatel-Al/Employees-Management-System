<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isToastMessage: {
    default: false
  },
  toastMessage: {
    default: null
  },
  color: {
    default: 'green'
  }
})

const emit = defineEmits(['update:isToastMessage'])

const isToast = ref(false)

watch(props, () => {
  isToast.value = props.isToastMessage
})

watch(isToast, (val) => {
  emit('update:isToastMessage', val)
})
</script>

<template>
  <div class="text-center">
    <v-snackbar v-model="isToast" :timeout="2000" :color="color">
      {{ toastMessage }}
    </v-snackbar>
  </div>
</template>
