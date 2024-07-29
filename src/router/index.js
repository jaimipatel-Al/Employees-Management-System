import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/EmployeeList.vue')
    },
    {
      path: '/add-employee',
      name: 'add-employee',
      component: () => import('../views/AddEmployee.vue')
    },
    {
      path: '/edit-employee/:id',
      name: 'edit-employee',
      component: () => import('../views/AddEmployee.vue')
    }
  ]
})

export default router
