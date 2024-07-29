<script setup>
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'

const props = defineProps({
  isAddEditExperience: {
    default: false
  },
  item: {
    default: null
  }
})

const emit = defineEmits(['update:isAddEditExperience', 'addNewExperience', 'updatedExperience'])

const isPopup = ref(false)

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    companyName(value) {
      if (value) return true
      return 'Company name is required.'
    },
    position(value) {
      if (value) return true
      return 'Position is required.'
    },
    totalYears(value) {
      if (!value) return 'Total years is required.'
      if (value?.length <= 2 && /[0-9-]+/.test(value)) return true
      return 'Total years is invalid.'
    },
    ctc(value) {
      if (!value) return 'Last CTC is required.'
      if (value?.length && /[0-9-]+/.test(value)) return true
      return 'Last CTC is invalid.'
    }
  }
})

const companyName = useField('companyName')
const position = useField('position')
const ctc = useField('ctc')
const totalYears = useField('totalYears')

watch(props, () => {
  isPopup.value = props.isAddEditExperience

  if (props.item && isPopup.value) {
    companyName.value.value = props.item.companyName
    position.value.value = props.item.position
    totalYears.value.value = props.item.totalYears
    ctc.value.value = props.item.ctc
  }
})

watch(isPopup, (val) => {
  emit('update:isAddEditExperience', val)

  if (!val) handleReset()
})

const submit = handleSubmit((values) => {
  values.id = props.item ? props.item.id : Math.round(Math.random() * 1000000)

  if (!props.item) emit('addNewExperience', values)
  else emit('updatedExperience', values)

  isPopup.value = false
})

const cancelAction = () => {
  isPopup.value = false
}
</script>

<template>
  <v-dialog v-model="isPopup" width="auto">
    <v-card width="400" :title="`${!item ? 'Add' : 'Update'} Experience Detail`">
      <form @submit.prevent="submit" class="add-edit-experience">
        <v-text-field
          v-model="companyName.value.value"
          :error-messages="companyName.errorMessage.value"
          label="Company Name	*"
        ></v-text-field>

        <v-text-field
          v-model="position.value.value"
          :error-messages="position.errorMessage.value"
          label="Position*"
        ></v-text-field>

        <v-text-field
          v-model="totalYears.value.value"
          :error-messages="totalYears.errorMessage.value"
          type="number"
          label="Total Year*"
        ></v-text-field>

        <v-text-field
          v-model="ctc.value.value"
          :error-messages="ctc.errorMessage.value"
          type="number"
          label="Last CTC	*"
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
.add-edit-experience {
  padding: 20px;
}
</style>
