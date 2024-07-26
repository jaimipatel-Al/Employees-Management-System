<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useEmployeeStore } from '../stores/employee'
import ToastMessage from '../components/elements/ToastMessage.vue'

const router = useRouter()
const employeeStore = useEmployeeStore()

const employeesList = computed(() => [...employeeStore.employees])
const isToastMessage = ref(false)
const toastMessage = ref('')

const headers = [
  {
    title: 'Profile Picture',
    align: 'start',
    sortable: false,
    key: 'profile'
  },
  { title: 'Name', key: 'name', align: 'start' },
  { title: 'Department', key: 'professionalDetails.department', align: 'center' },
  { title: 'Designation', key: 'professionalDetails.designation', align: 'center' },
  { title: 'Email', key: 'personalDetails.email', align: 'center' },
  { title: 'Mobile Number', key: 'personalDetails.mobile', align: 'end' },
  { title: 'Resume', key: 'resume', align: 'center' },
  { title: 'Action', align: 'center', key: 'action' }
]

const itemsPerPage = ref(5)
const search = ref()
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)

const loadItems = ({ page, itemsPerPage, sortBy }) => {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    totalItems.value = total
    loading.value = false
  })
}

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = employeesList.value.slice()

        if (sortBy?.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items?.length })
      }, 500)
    })
  }
}

const addNewEmployee = () => {
  employeeStore.setUpdatedId(null)
  router.push({ name: 'add-employee' })
}

const editEmployee = (item) => {
  employeeStore.setUpdatedId(item.id)
  employeeStore.personalDetailsUpdate({ ...item.personalDetails })
  employeeStore.bankDetailsUpdate({ ...item.bankDetails })
  employeeStore.professionalDetailsUpdate({ ...item.professionalDetails })
  employeeStore.educationDetailsUpdate([...item.educationDetails])
  employeeStore.experienceDetailsUpdate([...item.experienceDetails])
  employeeStore.currentOrganizationDetailsUpdate({ ...item.currentOrganizationDetails })

  router.push({ name: 'edit-employee', params: { id: item.id } })
}
const deleteEmployee = (id) => {
  employeeStore.deleteEmployees(id)
  isToastMessage.value = true
  toastMessage.value = 'Employee detail deleted successfully!!'
}

const downloadResume = (file) => {
  const url = URL.createObjectURL(file)

  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()

  // Clean up
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const imageSrc = (file) => {
  return URL.createObjectURL(file)
}

watch(employeesList, () => {
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value })
})
</script>

<template>
  <div class="employee-list">
    <h1 class="text-center">Employee Management System</h1>
    <div class="pa-4 text-end">
      <v-btn prepend-icon="mdi-plus" color="#884cff" @click="addNewEmployee">
        Add New Employee
      </v-btn>
    </div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
      loading-text="Loading... Please wait"
      @update:options="loadItems"
    >
      <!-- profile -->
      <template v-slot:item.profile="{ item }">
        <img
          :src="imageSrc(item.personalDetails.profile)"
          :alt="item.personalDetails.fname"
          class="profile-image"
        />
      </template>
      <template v-slot:item.name="{ item }">
        {{
          item.personalDetails.fname +
          ' ' +
          item.personalDetails.mname +
          ' ' +
          item.personalDetails.lname
        }}
      </template>
      <template v-slot:item.resume="{ item }">
        <v-icon
          icon="mdi-download"
          size="large"
          color="indigo"
          class="mr-1 cursor-pointer"
          @click="downloadResume(item.professionalDetails.resume)"
        ></v-icon>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          icon="mdi-pencil"
          size="large"
          color="green-darken-2"
          class="mr-1 cursor-pointer"
          @click="editEmployee(item)"
        ></v-icon>
        <v-icon
          icon="mdi-delete"
          size="large"
          color="red-darken-2"
          class="mr-1 cursor-pointer"
          @click="deleteEmployee(item.id)"
        ></v-icon>
      </template>
    </v-data-table-server>
    <ToastMessage v-model:isToastMessage="isToastMessage" :toastMessage="toastMessage" />
  </div>
</template>

<style>
.employee-list .v-table {
  box-shadow: 1px 2px 4px #ccc;
  border-radius: 8px;
  width: 90%;
  margin: 20px auto;
}
.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
