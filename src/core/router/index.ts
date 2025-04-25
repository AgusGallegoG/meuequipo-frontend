import { useAuthStore } from '@/auth/store/authStore';
import Cookies from 'js-cookie';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { UtilBase } from '@/core/utilities/UtilBase';

declare module 'vue-router' {
  interface RouteMeta {
    parent?: { path: string; name: string };
    transition?: string;
    requiresAuth: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: { requiresAuth: false }, // Public web
    component: () => import('@/core/layout/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'inicio',
        component: () => import('@/core/views/base/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/core/views/base/AboutView.vue'),
      },
      // aqui van las rutas de los hijos
    ],
  },
  {
    path: '/administracion',
    name: 'admin',
    meta: { requiresAuth: true }, // Protect this route
    redirect: '/administracion/dashboard',
    component: () => import('@/core/layout/BaseLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/core/views/admin/DashboardView.vue'),
      },
      // aqui van las rutas de los hijos
    ],
  },
  {
    path: '/administracion/login',
    name: 'admin-login',
    component: () => import('@/core/views/admin/BaseLoginAdministration.vue'), // Login page without BaseLayout
  },
  //Add here routers from other modules {path/name/component/meta}
];

const history = createWebHistory(import.meta.env.BASE_URL);

const router = createRouter({
  history: history,
  routes: routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const token = Cookies.get('token');
  const storeToken = authStore.getToken;
  const isAuthenticated = UtilBase.exist(token) && token === storeToken;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/administracion/login'); // Redirect to login if not authenticated
  } else if (to.name === 'admin-login' && isAuthenticated) {
    next('/administracion/dashboard'); // Prevent logged-in users from seeing login
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  const isDescendant = (to, from) => {
    return to.meta?.parent?.name === from.name;
  };

  const isAncestor = (to, from) => {
    return from.meta?.parent?.name === to.name;
  };

  if (isDescendant(to, from)) {
    to.meta.transition = 'slide-left';
  } else if (isAncestor(to, from)) {
    to.meta.transition = 'slide-right';
  } else {
    to.meta.transition = 'fade';
  }
});

export default router;
