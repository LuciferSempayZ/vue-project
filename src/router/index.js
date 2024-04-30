import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SliderPhotoPizza from '@/components/SliderPhotoPizza.vue';
import About from "@/components/About.vue";
import Authorization from "@/components/Authorization.vue";
import Registration from "@/components/Registration.vue";
import Profile from "@/components/Profile.vue";
// Объявляем маршруты
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/Slider',
    name: 'Slider',
    component: SliderPhotoPizza,
  },
  {
    path: '/About',
    name: 'About',
    component: About,
  },
  {
    path: '/authorization',
    name: 'Authorization',
    component: Authorization,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/category/:categoryId',
    name: 'ProductCategory',
    component: ProductCategory,
  },
  // Другие маршруты
];

// Создаём экземпляр маршрутизатора
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth', // Плавный скроллинг
      };
    }
    return savedPosition || { top: 0, behavior: 'smooth' };
  },
});

export default router; // Экспортируем один раз
