import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from "@/components/About.vue";
import Authorization from "@/components/Authorization.vue";
import Registration from "@/components/Registration.vue";
import Profile from "@/components/Profile.vue";
import CategoryList from "@/components/CategoryList.vue";
import ProductCategories from "@/components/ProductCategories.vue";
import News from "@/components/News.vue";
import NewsGet from "@/components/NewsGet.vue";
import Cart from "@/components/Cart.vue";
import EditProfile from "@/components/EditProfile.vue";
import { isAuthenticated } from '@/stores/auth.js'; // Импортируем флаг авторизации
// Объявляем маршруты
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
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
    path: '/article/:id', // Маршрут, который принимает параметр `id`
    name: 'article', // Имя маршрута
    component: NewsGet, // Компонент, который отображает статью
  },
  {
    path: '/news', // Маршрут для страницы с новостями
    name: 'news',
    component: News, // Убедитесь, что компонент импортирован
  },
  // {
  //   path: '/category/:categoryId',
  //   name: 'ProductCategories',
  //   component: ProductCategories,
  // },
  {
    path: '/products/category/:categoryId',
    name: 'ProductCategories',
    component: CategoryList,
  },
   {
     path: '/category/:id', // Маршрут с параметром категории
     name: 'CategoryList',
     component: CategoryList,
     props: true, // Передача параметра в качестве свойства компонента
   },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/edit-profile',
    name: 'Edit-profile',
    component: EditProfile
  }
];

// Создаём экземпляр маршрутизатора
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // Проверка, что элемент существует
      const target = document.querySelector(to.hash);
      if (target) {
        return {
          el: target,
          behavior: 'smooth', // Плавный скроллинг
        };
      }
    }
    return savedPosition || { top: 0, behavior: 'smooth' };
  },
});


export default router; // Экспортируем один раз
