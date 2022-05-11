import {defineConfig} from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {path: '/', component: '@/pages/home'},
    {path: '/login', component: '@/pages/login'},
    {path: '/search', component: '@/pages/search'},
    {path: '/cart', component: '@/pages/cart'},
    {path: '/signup', component: '@/pages/login'},
    {path: '/manage', component: '@/pages/login'},
    {path: '/detail', component: '@/pages/detail'}
  ],
  fastRefresh: {},
  hash: true,
  mfsu: {},
  layout: {
    name: 'Book Store',
    locale: true,
    layout: 'top',
    navTheme: 'light',
  },
});
