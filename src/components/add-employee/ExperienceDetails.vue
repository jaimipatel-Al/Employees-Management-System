<script setup>
import { onMounted, ref } from 'vue'
import AddEditExperience from '../elements/AddEditExperience.vue'
import ActionButton from '../elements/ActionButton.vue'
import ToastMessage from '../elements/ToastMessage.vue'
import { useEmployeeStore } from '../../stores/employee'

const emit = defineEmits(['previousStep', 'nextStep', 'completeStep'])

const employeeStore = useEmployeeStore()

const itemsPerPage = ref(5)
const isAddEditExperience = ref(false)
const updatedItem = ref(null)
const isToastMessage = ref(false)
const toastMessage = ref(null)
const toastColor = ref('green')

const headers = [
  { title: 'Company Name	', align: 'start', key: 'companyName' },
  { title: 'Position', align: 'end', key: 'position' },
  { title: 'Total Year', align: 'end', key: 'totalYears' },
  { title: 'Last CTC', align: 'end', key: 'ctc' },
  { title: 'Action', align: 'center', key: 'action' }
]
const experiences = ref([])

const addExperience = () => {
  isAddEditExperience.value = true
  updatedItem.value = null
}

const editExperience = (item) => {
  isAddEditExperience.value = true
  updatedItem.value = item
}

const deleteExperience = (id) => {
  let arr = experiences.value.filter((e) => e.id != id)
  experiences.value = [...arr]
  isToastMessage.value = true
  toastColor.value = 'green'
  toastMessage.value = 'Experience detail deleted successfully!!'
}

const addNewExperience = (item) => {
  experiences.value.push({ ...item })
  isToastMessage.value = true
  toastColor.value = 'green'
  toastMessage.value = 'Experience detail add successfully!!'
}

const updatedExperience = (item) => {
  let arr = experiences.value.map((e) => {
    if (e.id != item.id) return e
    else return item
  })
  experiences.value = [...arr]

  isToastMessage.value = true
  toastColor.value = 'green'
  toastMessage.value = 'Experience detail updated successfully!!'
}

const nextStep = () => {
  if (experiences.value?.length) {
    employeeStore.experienceDetailsUpdate([...experiences.value])

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
  experiences.value = employeeStore?.experienceDetails?.length
    ? [...employeeStore.experienceDetails]
    : []
})
</script>

<template>
  <div>
    <h2 class="text-center">Experience Details</h2>
    <div class="text-end">
      <v-btn prepend-icon="mdi-plus" @click="addExperience"> Add Experience </v-btn>
    </div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="experiences"
      :items-length="experiences?.length ?? 0"
      :sticky="true"
      item-value="name"
      class="Experience-table"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          icon="mdi-pencil"
          size="large"
          color="green-darken-2"
          class="mr-1 cursor-pointer"
          @click="editExperience(item)"
        ></v-icon>
        <v-icon
          icon="mdi-delete"
          size="large"
          color="red-darken-2"
          class="mr-1 cursor-pointer"
          @click="deleteExperience(item.id)"
        ></v-icon>
      </template>
    </v-data-table-server>
    <ActionButton @previousStep="previousStep" @nextStep="nextStep" />

    <AddEditExperience
      v-model:isAddEditExperience="isAddEditExperience"
      :item="updatedItem"
      @addNewExperience="addNewExperience"
      @updatedExperience="updatedExperience"
    />

    <ToastMessage
      v-model:isToastMessage="isToastMessage"
      :toastMessage="toastMessage"
      :color="toastColor"
    />
  </div>
</template>

<style scoped>
.Experience-table {
  width: 90%;
  margin: 20px auto;
  box-shadow: 1px 1px 8px #dbdbdb;
  padding: 8px;
  border-radius: 4px;
}
</style>
