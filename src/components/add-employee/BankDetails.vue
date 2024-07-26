<script setup>
import ActionButton from '../elements/ActionButton.vue'
import { useField, useForm } from 'vee-validate'
import { useEmployeeStore } from '../../stores/employee'
import { onMounted } from 'vue'

const emit = defineEmits(['previousStep', 'nextStep', 'completeStep'])

const employeeStore = useEmployeeStore()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    bankName(value) {
      if (value) return true
      return 'Bank Name is required.'
    },
    accountName(value) {
      if (value) return true
      return 'Account Name is required.'
    },
    accountNumber(value) {
      if (!value) return 'Bank Account Number is required.'
      else if (value?.length <= 9 || value?.length >= 18)
        return 'Bank Account Number must be of 9-18 digits.'
      return true
    },
    ifsc(value) {
      if (!value) return 'IFSC Code is required.'
      else if (/^[A-Z]{4}0\d{6}$/.test(value)) return true
      return 'IFSC Code must be of format AAAA0111111.'
    },
    adharNumber(value) {
      if (!value) return 'Adhar Card Number is required.'
      if (value?.length == 12 && /[0-9-]+/.test(value)) return true
      return 'Adhar Card Number is invalid.'
    },
    pan(value) {
      if (value) return true
      return 'PAN Card Number is required.'
    }
  }
})

const bankName = useField('bankName')
const accountName = useField('accountName')
const accountNumber = useField('accountNumber')
const ifsc = useField('ifsc')
const adharNumber = useField('adharNumber')
const pan = useField('pan')

const nextStep = handleSubmit((values) => {
  employeeStore.bankDetailsUpdate({ ...values })
  emit('nextStep')
  emit('completeStep')
})

const previousStep = () => {
  emit('previousStep')
}

onMounted(() => {
  if (employeeStore.bankDetails) {
    bankName.value.value = employeeStore.bankDetails.bankName
    accountName.value.value = employeeStore.bankDetails.accountName
    accountNumber.value.value = employeeStore.bankDetails.accountNumber
    ifsc.value.value = employeeStore.bankDetails.ifsc
    adharNumber.value.value = employeeStore.bankDetails.adharNumber
    pan.value.value = employeeStore.bankDetails.pan
  }
})
</script>

<template>
  <div>
    <h2 class="text-center">Bank Details</h2>
    <form class="mt-8">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="bankName.value.value"
            :error-messages="bankName.errorMessage.value"
            label="Bank Name*"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="accountName.value.value"
            :error-messages="accountName.errorMessage.value"
            label="Account Name*"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="accountNumber.value.value"
            :error-messages="accountNumber.errorMessage.value"
            label="Bank Account Number*"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="ifsc.value.value"
            :error-messages="ifsc.errorMessage.value"
            label="IFSC Code*"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="adharNumber.value.value"
            :error-messages="adharNumber.errorMessage.value"
            label="Adhar Card Number*"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="pan.value.value"
            :error-messages="pan.errorMessage.value"
            label="PAN Card Number*"
          ></v-text-field>
        </v-col>
      </v-row>
    </form>
    <ActionButton @previousStep="previousStep" @nextStep="nextStep" />
  </div>
</template>
