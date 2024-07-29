<script setup>
import { useField, useForm } from 'vee-validate'
import ActionButton from '../elements/ActionButton.vue'
import { useEmployeeStore } from '../../stores/employee'
import { onMounted } from 'vue'

const emit = defineEmits(['previousStep', 'nextStep', 'completeStep'])

const employeeStore = useEmployeeStore()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    designation(value) {
      if (value) return true
      return 'Designation is required.'
    },
    department(value) {
      if (value) return true
      return 'Department is required.'
    },
    experienceYear(value) {
      if (value || value === 0) return true
      return 'Years of experience is required.'
    },
    experienceMonth(value) {
      if (value || value === 0) return true
      return 'Months of experience is required.'
    },
    location(value) {
      if (value) return true
      return 'Current Location is required.'
    },
    skills(value) {
      if (value) return true
      return 'Skill is required.'
    },
    resume(value) {
      if (value) return true
      return 'Resume is required.'
    }
  }
})

const designation = useField('designation')
const department = useField('department')
const experienceYear = useField('experienceYear')
const experienceMonth = useField('experienceMonth')
const location = useField('location')
const skills = useField('skills')
const resume = useField('resume')

const yearsOptions = [
  { title: '0 Year', value: 0 },
  { title: '1 Year', value: 1 },
  { title: '2 Years', value: 2 },
  { title: '3 Years', value: 3 },
  { title: '4 Years', value: 4 },
  { title: '5 Years', value: 5 },
  { title: '6 Years', value: 6 },
  { title: '7 Years', value: 7 }
]

const monthsOptions = [
  { title: '0 Month', value: 0 },
  { title: '1 Month', value: 1 },
  { title: '2 Months', value: 2 },
  { title: '3 Months', value: 3 },
  { title: '4 Months', value: 4 },
  { title: '5 Months', value: 5 },
  { title: '6 Months', value: 6 },
  { title: '7 Months', value: 7 },
  { title: '8 Months', value: 8 },
  { title: '9 Months', value: 9 },
  { title: '10 Months', value: 10 },
  { title: '11 Months', value: 11 }
]

const skillOptions = ['Vue', 'React', 'Angular']

const nextStep = handleSubmit((values) => {
  employeeStore.professionalDetailsUpdate({ ...values })
  emit('nextStep')
  emit('completeStep')
})

const previousStep = () => {
  emit('previousStep')
}

onMounted(() => {
  if (employeeStore.professionalDetails) {
    designation.value.value = employeeStore.professionalDetails.designation
    department.value.value = employeeStore.professionalDetails.department
    experienceYear.value.value = employeeStore.professionalDetails.experienceYear
    experienceMonth.value.value = employeeStore.professionalDetails.experienceMonth
    location.value.value = employeeStore.professionalDetails.location
    skills.value.value = employeeStore.professionalDetails.skills
    resume.value.value = employeeStore.professionalDetails.resume
  }
})
</script>

<template>
  <div>
    <h2 class="text-center">Professional Details</h2>
    <form class="mt-8">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="designation.value.value"
            :error-messages="designation.errorMessage.value"
            label="Designation*"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="department.value.value"
            :error-messages="department.errorMessage.value"
            label="Department*"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center ga-2 flex-wrap">
          <label for="">Experience</label>
          <v-select
            v-model="experienceYear.value.value"
            :error-messages="experienceYear.errorMessage.value"
            :items="yearsOptions"
            item-title="title"
            item-value="value"
            label="Years"
          ></v-select>
          <v-select
            v-model="experienceMonth.value.value"
            :error-messages="experienceMonth.errorMessage.value"
            :items="monthsOptions"
            item-title="title"
            item-value="value"
            label="Months"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="location.value.value"
            :error-messages="location.errorMessage.value"
            label="Current Location*"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="skills.value.value"
            :items="skillOptions"
            label="Skills*"
            multiple
            :error-messages="skills.errorMessage.value"
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-file-input
            v-model="resume.value.value"
            label="Resume*"
            :error-messages="resume.errorMessage.value"
          ></v-file-input>
        </v-col>
      </v-row>
    </form>
    <ActionButton @previousStep="previousStep" @nextStep="nextStep" />
  </div>
</template>
