import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('employee', () => {
  const id = ref(null)
  const employees = ref([])

  const personalDetails = ref(null)
  const bankDetails = ref(null)
  const professionalDetails = ref(null)
  const educationDetails = ref(null)
  const experienceDetails = ref(null)
  const currentOrganizationDetails = ref(null)

  const setUpdatedId = (val) => {
    id.value = val
  }

  const addEmployees = (val) => {
    employees.value.push({ ...val })
  }

  const updateEmployees = (val) => {
    const arr = employees.value.map((e) => {
      if (e.id != val.id) return e
      else return val
    })

    employees.value = [...arr]
  }

  const deleteEmployees = (id) => {
    employees.value = employees.value.filter((e) => e.id !== id)
  }

  const personalDetailsUpdate = (val) => {
    personalDetails.value = val ? { ...val } : null
  }
  const bankDetailsUpdate = (val) => {
    bankDetails.value = val ? { ...val } : null
  }
  const professionalDetailsUpdate = (val) => {
    professionalDetails.value = val ? { ...val } : null
  }
  const educationDetailsUpdate = (val) => {
    educationDetails.value = val ? [...val] : null
  }
  const experienceDetailsUpdate = (val) => {
    experienceDetails.value = val ? [...val] : null
  }
  const currentOrganizationDetailsUpdate = (val) => {
    currentOrganizationDetails.value = val ? { ...val } : null
  }

  return {
    id,
    setUpdatedId,
    employees,
    addEmployees,
    updateEmployees,
    deleteEmployees,
    personalDetails,
    personalDetailsUpdate,
    bankDetails,
    bankDetailsUpdate,
    professionalDetails,
    professionalDetailsUpdate,
    educationDetails,
    educationDetailsUpdate,
    experienceDetails,
    experienceDetailsUpdate,
    currentOrganizationDetails,
    currentOrganizationDetailsUpdate
  }
})
