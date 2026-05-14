const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue') },
      {path : 'about',component: () => import('pages/about/AboutPage.vue'), name: 'About'},
      {path : 'products',component: () => import('pages/products/ProcuctPage.vue'), name: 'Products'},
      {path : 'service',component: () => import('../pages/contact/ServicePage.vue'), name: 'Service',},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
