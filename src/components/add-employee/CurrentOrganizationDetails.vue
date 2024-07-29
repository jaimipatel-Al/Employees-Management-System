<script setup>
import ToastMessage from '../elements/ToastMessage.vue'
import ActionButton from '../elements/ActionButton.vue'
import { useField, useForm } from 'vee-validate'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { useEmployeeStore } from '../../stores/employee'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['previousStep'])

const router = useRouter()

const employeeStore = useEmployeeStore()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    joiningDate(value) {
      if (value) return true
      return 'Date of Birth is required.'
    },
    appraisalDate(value) {
      if (value) return true
      return 'Date of Birth is required.'
    },
    ctc(value) {
      if (!value) return 'Last CTC is required.'
      if (value?.length && /[0-9-]+/.test(value)) return true
      return 'Last CTC is invalid.'
    }
  }
})

const joiningDate = useField('joiningDate')
const appraisalDate = useField('appraisalDate')
const ctc = useField('ctc')

const isToastMessage = ref(false)
const toastMessage = ref(null)

const submit = handleSubmit((values) => {
  let obj = {
    id: employeeStore.id ? employeeStore.id : Math.round(Math.random() * 1000000),
    personalDetails: { ...employeeStore.personalDetails },
    bankDetails: { ...employeeStore.bankDetails },
    professionalDetails: { ...employeeStore.professionalDetails },
    educationDetails: [...employeeStore.educationDetails],
    experienceDetails: [...employeeStore.experienceDetails],
    currentOrganizationDetails: { ...values }
  }

  if (employeeStore.id) {
    employeeStore.updateEmployees({ ...obj })
    toastMessage.value = 'Employee updated successfully!!'
  } else {
    employeeStore.addEmployees({ ...obj })
    toastMessage.value = 'Employee added successfully!!'
  }

  isToastMessage.value = true
  router.push({ name: 'home' })

  setTimeout(() => {
    employeeStore.personalDetailsUpdate(null)
    employeeStore.bankDetailsUpdate(null)
    employeeStore.professionalDetailsUpdate(null)
    employeeStore.educationDetailsUpdate(null)
    employeeStore.experienceDetailsUpdate(null)
    employeeStore.currentOrganizationDetailsUpdate(null)
  }, 2000)
})

const previousStep = () => {
  emit('previousStep')
}

onMounted(() => {
  if (employeeStore.currentOrganizationDetails) {
    joiningDate.value.value = employeeStore.currentOrganizationDetails.joiningDate
    appraisalDate.value.value = employeeStore.currentOrganizationDetails.appraisalDate
    ctc.value.value = employeeStore.currentOrganizationDetails.ctc
  }
})
</script>

<template>
  <div>
    <h2 class="text-center">Current Organization Details</h2>
    <form class="mt-8">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-date-input
            v-model="joiningDate.value.value"
            label="Joining Date*"
            :error-messages="joiningDate.errorMessage.value"
          ></v-date-input>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-date-input
            v-model="appraisalDate.value.value"
            label="Next Appraisal Date*"
            :error-messages="appraisalDate.errorMessage.value"
          ></v-date-input>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="ctc.value.value"
            :error-messages="ctc.errorMessage.value"
            type="number"
            label="Last CTC	*"
          ></v-text-field
        ></v-col>
      </v-row>
    </form>
    <ActionButton :isNext="false" @previousStep="previousStep" @submit="submit" />
    <ToastMessage v-model:isToastMessage="isToastMessage" :toastMessage="toastMessage" />
  </div>
</template>
