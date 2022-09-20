import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/home' },
    { path: '/login', component: '@/pages/login' },
    { path: '/search', component: '@/pages/search' },
    { path: '/cart', component: '@/pages/cart' },
    { path: '/signup', component: '@/pages/signup' },
    { path: '/manage/user', component: '@/pages/manage/user' },
    { path: '/manage/book', component: '@/pages/manage/book' },
    { path: '/manage/edit', component: '@/pages/manage/edit' },
    { path: '/manage/order', component: '@/pages/manage/order' },
    { path: '/manage/topseller', component: '@/pages/manage/topSeller' },
    { path: '/statistics', component: '@/pages/statistics' },
    { path: '/order', component: '@/pages/order' },
    { path: '/detail', component: '@/pages/detail' },
  ],
  hash: true,
  layout: {
    name: 'Book Store',
    locale: true,
    layout: 'top',
    navTheme: 'light',
  },
});
