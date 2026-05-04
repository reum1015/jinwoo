import UserTest from 'layouts/UserTest.vue'
import CaTest from 'src/pages/CaTest.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/user',
    component: UserTest,
    name: 'User',
    children: [
      {
        path: 'about',
        component: CaTest,
      },
    ],
  },

  {
    path: '/test',
    component: () => import('../pages/TestPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
