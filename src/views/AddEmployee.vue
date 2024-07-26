<script setup>
import PersonalDetails from '../components/add-employee/PersonalDetails.vue'
import BankDetails from '../components/add-employee/BankDetails.vue'
import ProfessionalDetails from '../components/add-employee/ProfessionalDetails.vue'
import EducationDetails from '../components/add-employee/EducationDetails.vue'
import ExperienceDetails from '../components/add-employee/ExperienceDetails.vue'
import CurrentOrganizationDetails from '../components/add-employee/CurrentOrganizationDetails.vue'
import { onMounted, ref } from 'vue'
import { useEmployeeStore } from '../stores/employee'

const employeeStore = useEmployeeStore()

const currentStep = ref(1)
const complete = ref(1)
const stepsHeader = [
  'Personal Details',
  'Bank Details',
  'Professional Details',
  'Education Details',
  'Experience Details',
  'Current Organization Details'
]

const previousStep = () => {
  currentStep.value = currentStep.value - 1
}
const nextStep = () => {
  currentStep.value = currentStep.value + 1
}
const completeStep = (val) => {
  if (employeeStore.id) complete.value = 7
  else if (val > complete.value) complete.value = val
}

onMounted(() => {
  if (employeeStore.id) complete.value = 7
})
</script>

<template>
  <div>
    <v-stepper v-model="currentStep" alt-labels>
      <v-stepper-header>
        <template v-for="(item, i) in stepsHeader" :key="i">
          <v-divider v-if="!!i" :key="i"></v-divider>

          <v-stepper-item
            :title="item"
            :step="item"
            :value="i + 1"
            :complete="i + 1 < complete"
            :editable="i < complete"
          ></v-stepper-item>
        </template>
      </v-stepper-header>

      <v-stepper-window>
        <v-stepper-window-item
          v-for="(i, n) in stepsHeader + 1"
          :key="`${n + 1}-content`"
          :value="i + 1"
        >
          <PersonalDetails
            v-if="n === 1"
            @nextStep="nextStep"
            @completeStep="completeStep(n + 1)"
          />
          <BankDetails
            v-else-if="n === 2"
            @previousStep="previousStep"
            @nextStep="nextStep"
            @completeStep="completeStep(n + 1)"
          />
          <ProfessionalDetails
            v-else-if="n === 3"
            @previousStep="previousStep"
            @nextStep="nextStep"
            @completeStep="completeStep(n + 1)"
          />
          <EducationDetails
            v-else-if="n === 4"
            @previousStep="previousStep"
            @nextStep="nextStep"
            @completeStep="completeStep(n + 1)"
          />
          <ExperienceDetails
            v-else-if="n === 5"
            @previousStep="previousStep"
            @nextStep="nextStep"
            @completeStep="completeStep(n + 1)"
          />
          <CurrentOrganizationDetails
            v-else-if="n === 6"
            @previousStep="previousStep"
            @completeStep="completeStep(n + 1)"
          />
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </div>
</template>

<style>
.v-stepper-header,
.v-stepper.v-sheet {
  box-shadow: none;
}

.v-stepper-item__title {
  font-size: 10px;
  text-wrap: nowrap;
}
</style>
