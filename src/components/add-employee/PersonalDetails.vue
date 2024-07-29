<script setup>
import { useField, useForm } from 'vee-validate'
import { VDateInput } from 'vuetify/labs/VDateInput'
import ActionButton from '../elements/ActionButton.vue'
import { onMounted, ref, watch } from 'vue'
import { useEmployeeStore } from '../../stores/employee'

const emit = defineEmits(['nextStep', 'completeStep'])

const employeeStore = useEmployeeStore()

const copyAddress = ref(false)

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    fname(value) {
      if (!value) return 'First name is required.'
      else if (value?.length >= 20) return 'First name should be maximum of 20 characters.'
      return true
    },
    mname(value) {
      if (!value) return 'Middle name is required.'
      else if (value?.length >= 20) return 'Middle name should be maximum of 20 characters.'
      return true
    },
    lname(value) {
      if (!value) return 'Last name is required.'
      else if (value?.length >= 20) return 'Last name should be maximum of 20 characters.'
      return true
    },
    email(value) {
      if (!value) return 'Email is required.'
      else if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
      return 'Email is invalid.'
    },
    mobile(value) {
      if (!value) return 'Phone number is required.'
      else if (value?.length == 10 && /[0-9-]+/.test(value)) return true
      return 'Phone number is invalid.'
    },
    presentAddress(value) {
      if (value) return true
      return 'Present address is required.'
    },
    permanentAddress(value) {
      if (value) return true
      return 'Permanent address is required.'
    },
    dob(value) {
      if (value) return true
      return 'Date of Birth is required.'
    },
    profile(value) {
      if (value) return true
      return 'Profile is required.'
    }
  }
})

const fname = useField('fname')
const mname = useField('mname')
const lname = useField('lname')
const email = useField('email')
const mobile = useField('mobile')
const presentAddress = useField('presentAddress')
const permanentAddress = useField('permanentAddress')
const dob = useField('dob')
const profile = useField('profile')

const nextStep = handleSubmit((values) => {
  employeeStore.personalDetailsUpdate({ ...values })
  emit('nextStep')
  emit('completeStep')
})

watch(copyAddress, (val) => {
  if (val) permanentAddress.value.value = presentAddress.value.value
})

watch(
  () => presentAddress?.value?.value,
  (val) => {
    if (copyAddress.value) permanentAddress.value.value = val
  }
)

onMounted(() => {
  if (employeeStore.personalDetails) {
    fname.value.value = employeeStore.personalDetails.fname
    mname.value.value = employeeStore.personalDetails.mname
    lname.value.value = employeeStore.personalDetails.lname
    email.value.value = employeeStore.personalDetails.email
    mobile.value.value = employeeStore.personalDetails.mobile
    presentAddress.value.value = employeeStore.personalDetails.presentAddress
    permanentAddress.value.value = employeeStore.personalDetails.permanentAddress
    dob.value.value = employeeStore.personalDetails.dob
    profile.value.value = employeeStore.personalDetails.profile
  }
})
</script>

<template>
  <div>
    <h2 class="text-center">Personal Details</h2>
    <form class="mt-8">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field
            v-model="fname.value.value"
            :error-messages="fname.errorMessage.value"
            label="First Name*"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field
            v-model="mname.value.value"
            :error-messages="mname.errorMessage.value"
            label="Middle Name*"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field
            v-model="lname.value.value"
            :error-messages="lname.errorMessage.value"
            label="Last Name*"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="Email*"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field
            v-model="mobile.value.value"
            :counter="10"
            :error-messages="mobile.errorMessage.value"
            label="Mobile Number*"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="8" sm="3" md="2" lg="3">
          <v-date-input
            v-model="dob.value.value"
            label="Date of Birth*"
            :error-messages="dob.errorMessage.value"
          ></v-date-input>
        </v-col>
        <v-col cols="4" sm="3" md="2" lg="3">
          <v-file-input
            v-model="profile.value.value"
            label="Profile Image*"
            accept="image/*"
            :error-messages="profile.errorMessage.value"
          ></v-file-input>
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea
            v-model="presentAddress.value.value"
            label="Present Address*"
            :error-messages="presentAddress.errorMessage.value"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea
            v-model="permanentAddress.value.value"
            label="Permanent Address*"
            :error-messages="permanentAddress.errorMessage.value"
            :disabled="copyAddress"
          ></v-textarea>
        </v-col>
        <v-col cols="12" class="copy-check-box">
          <v-checkbox v-model="copyAddress" label="Copy to Permanent Address"></v-checkbox>
        </v-col>
      </v-row>
    </form>
    <ActionButton :isBack="false" @nextStep="nextStep" />
  </div>
</template>

<style scoped>
.copy-check-box {
  padding: 0;
}
</style>
