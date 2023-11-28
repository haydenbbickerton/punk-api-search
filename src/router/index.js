import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Beers',
    component: () => import('@/views/beer/Beers.vue'),
    children: [
      {
        path: 'beer/:id?',
        name: 'SelectedBeer',
        component: () => import('@/views/beer/SelectedBeer.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
