<script setup>
import { onMounted, ref } from 'vue'
import AddEditEducation from '../elements/AddEditEducation.vue'
import ActionButton from '../elements/ActionButton.vue'
import ToastMessage from '../elements/ToastMessage.vue'
import { useEmployeeStore } from '../../stores/employee'

const emit = defineEmits(['previousStep', 'nextStep', 'completeStep'])

const employeeStore = useEmployeeStore()

const itemsPerPage = ref(5)
const isAddEditEduction = ref(false)
const updatedItem = ref(null)
const isToastMessage = ref(false)
const toastMessage = ref(null)
const toastColor = ref('green')

const headers = [
  { title: 'Education Name	', align: 'start', key: 'educationName' },
  { title: 'University Name', align: 'end', key: 'universityName' },
  { title: 'Result', align: 'end', key: 'result' },
  { title: 'Year Of Passing', align: 'end', key: 'passingYear' },
  { title: 'Action', align: 'center', key: 'action' }
]
const eductions = ref([])

const addEduction = () => {
  isAddEditEduction.value = true
  updatedItem.value = null
}

const editEduction = (item) => {
  isAddEditEduction.value = true
  updatedItem.value = item
}

const deleteEduction = (id) => {
  let arr = eductions.value.filter((e) => e.id != id)
  eductions.value = [...arr]
  isToastMessage.value = true
  toastColor.value = 'green'
  toastMessage.value = 'Eduction detail deleted successfully!!'
}

const addNewEduction = (item) => {
  eductions.value.push({ ...item })
  isToastMessage.value = true
  toastColor.value = 'green'
  toastMessage.value = 'Eduction detail add successfully!!'
}

const updatedEduction = (item) => {
  let arr = eductions.value.map((e) => {
    if (e.id != item.id) return e
    else return item
  })
  eductions.value = [...arr]

  isToastMessage.value = true
  toastColor.value = 'green'
  toastMessage.value = 'Eduction detail updated successfully!!'
}

const nextStep = () => {
  if (eductions.value?.length) {
    employeeStore.educationDetailsUpdate([...eductions.value])

    emit('nextStep')
    emit('completeStep')
  } else {
    isToastMessage.value = true
    toastColor.value = 'red'
    toastMessage.value = 'Please add at least one record!!'
  }
}

const previousStep = () => {
  emit('previousStep')
}

onMounted(() => {
  eductions.value = employeeStore?.educationDetails?.length
    ? [...employeeStore.educationDetails]
    : []
})
</script>

<template>
  <div>
    <h2 class="text-center">Education Details</h2>
    <div class="text-end">
      <v-btn prepend-icon="mdi-plus" @click="addEduction"> Add Education </v-btn>
    </div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="eductions"
      :items-length="eductions?.length ?? 0"
      :sticky="true"
      item-value="name"
      class="education-table"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          icon="mdi-pencil"
          size="large"
          color="green-darken-2"
          class="mr-1 cursor-pointer"
          @click="editEduction(item)"
        ></v-icon>
        <v-icon
          icon="mdi-delete"
          size="large"
          color="red-darken-2"
          class="mr-1 cursor-pointer"
          @click="deleteEduction(item.id)"
        ></v-icon>
      </template>
    </v-data-table-server>
    <ActionButton @previousStep="previousStep" @nextStep="nextStep" />

    <AddEditEducation
      v-model:isAddEditEduction="isAddEditEduction"
      :item="updatedItem"
      @addNewEduction="addNewEduction"
      @updatedEduction="updatedEduction"
    />

    <ToastMessage
      v-model:isToastMessage="isToastMessage"
      :toastMessage="toastMessage"
      :color="toastColor"
    />
  </div>
</template>

<style scoped>
.education-table {
  width: 90%;
  margin: 20px auto;
  box-shadow: 1px 1px 8px #dbdbdb;
  padding: 8px;
  border-radius: 4px;
}
</style>
