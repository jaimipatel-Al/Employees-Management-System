<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const desserts = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22'
  }
])

const headers = [
  {
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    key: 'name'
  },
  { title: 'Calories', key: 'calories', align: 'end' },
  { title: 'Fat (g)', key: 'fat', align: 'end' },
  { title: 'Carbs (g)', key: 'carbs', align: 'end' },
  { title: 'Protein (g)', key: 'protein', align: 'end' },
  { title: 'Iron (%)', key: 'iron', align: 'end' }
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
        const items = desserts.value.slice()

        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  }
}

const addNewEmployee = () => {
  router.push({ name: 'add-employee' })
}
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
    ></v-data-table-server>
  </div>
</template>

<style>
.employee-list .v-table {
  box-shadow: 1px 2px 4px #ccc;
  border-radius: 8px;
  width: 90%;
  margin: 20px auto;
}
</style>
