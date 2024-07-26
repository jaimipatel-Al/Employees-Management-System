<script setup>
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'

const props = defineProps({
  isAddEditEduction: {
    default: false
  },
  item: {
    default: null
  }
})

const emit = defineEmits(['update:isAddEditEduction', 'addNewEduction', 'updatedEduction'])

const isPopup = ref(false)

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    educationName(value) {
      if (value) return true
      return 'Education name is required.'
    },
    universityName(value) {
      if (value) return true
      return 'University name is required.'
    },
    result(value) {
      if (value) return true
      return 'Result is required.'
    },
    passingYear(value) {
      if (!value) return 'Year of passing is required.'
      if (value?.length == 4 && /[0-9-]+/.test(value)) return true
      return 'Year of passing is invalid.'
    }
  }
})

const educationName = useField('educationName')
const universityName = useField('universityName')
const result = useField('result')
const passingYear = useField('passingYear')

watch(props, () => {
  isPopup.value = props.isAddEditEduction

  if (props.item && isPopup.value) {
    educationName.value.value = props.item.educationName
    universityName.value.value = props.item.universityName
    result.value.value = props.item.result
    passingYear.value.value = props.item.passingYear
  }
})

watch(isPopup, (val) => {
  emit('update:isAddEditEduction', val)

  if (!val) handleReset()
})

const submit = handleSubmit((values) => {
  values.id = props.item ? props.item.id : Math.round(Math.random() * 1000000)

  if (!props.item) emit('addNewEduction', values)
  else emit('updatedEduction', values)

  isPopup.value = false
})

const cancelAction = () => {
  isPopup.value = false
}
</script>

<template>
  <v-dialog v-model="isPopup" width="auto">
    <v-card width="400" :title="`${!item ? 'Add' : 'Update'} Education Detail`">
      <form @submit.prevent="submit" class="add-edit-eduction">
        <v-text-field
          v-model="educationName.value.value"
          :error-messages="educationName.errorMessage.value"
          label="Education Name*"
        ></v-text-field>

        <v-text-field
          v-model="universityName.value.value"
          :error-messages="universityName.errorMessage.value"
          label="University Name*"
        ></v-text-field>

        <v-text-field
          v-model="result.value.value"
          :error-messages="result.errorMessage.value"
          label="Result*"
        ></v-text-field>

        <v-text-field
          v-model="passingYear.value.value"
          :error-messages="passingYear.errorMessage.value"
          type="number"
          label="Year Of Passing*"
        ></v-text-field>

        <div class="mt-8">
          <v-btn class="me-4" type="submit">
            {{ !item ? 'Add' : 'Update' }}
          </v-btn>
          <v-btn class="me-4" type="reset" @click="cancelAction"> Cancel </v-btn>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.add-edit-eduction {
  padding: 20px;
}
</style>
