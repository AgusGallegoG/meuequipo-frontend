import { useAuthStore } from '@/auth/store/authStore';
import { calendarRouter, calendarRouterAdmin } from '@/calendar/router/calendar.routes';
import { categoryRouterAdmin } from '@/category/router/category.routes';
import { UtilBase } from '@/core/utilities/UtilBase';
import { playerRouterAdmin } from '@/player/router/player.routes';
import { publicationRouter, publicationRouterAdmin } from '@/publication/router/publication.routes';
import { rivalsRouterAdmin } from '@/rivals/router/rivals.routes';
import { signinPeriodRouterAdmin } from '@/signinPeriod/router/signinPeriod.routes';
import { sponsorRouterAdmin } from '@/sponsor/router/sponsor.routes';
import { squadRouterAdmin } from '@/squad/router/squad.routes';
import { teamRouter, teamRouterAdmin } from '@/team/router/team.routes';
import { userRouterAdmin } from '@/user/router/user.routes';
import Cookies from 'js-cookie';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    parent?: { path: string; name: string };
    transition?: string;
    requiresAuth?: boolean;
    breadcrumbLabel?: string;
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
        name: 'Inicio',
        component: () => import('@/core/views/base/HomeView.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/core/views/base/AboutView.vue'),
      },
      // aqui van las rutas de los hijos
      ...calendarRouter,
      ...teamRouter,
      ...publicationRouter,
    ],
  },
  {
    path: '/administracion',
    name: 'Admin',
    meta: { requiresAuth: true, breadcrumbLabel: 'admin.breadcrumbs.inicio' }, // Protect this route
    redirect: '/administracion/dashboard',
    component: () => import('@/core/layout/BaseLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { requiresAuth: true, breadcrumbLabel: 'admin.breadcrumbs.dashboard' },
        component: () => import('@/core/views/admin/DashboardView.vue'),
      },
      {
        path: 'passwordchange',
        name: 'PassChange',
        meta: { requiresAuth: true, breadcrumbLabel: 'admin.breadcrumbs.changepass' },
        component: () => import('@/core/views/admin/ChangePasswordView.vue'),
      },
      // aqui van las rutas de los hijos
      ...sponsorRouterAdmin,
      ...teamRouterAdmin,
      ...publicationRouterAdmin,
      ...calendarRouterAdmin,
      ...playerRouterAdmin,
      ...signinPeriodRouterAdmin,
      ...rivalsRouterAdmin,
      ...categoryRouterAdmin,
      ...userRouterAdmin,
      ...squadRouterAdmin,
    ],
  },
  {
    path: '/administracion/login',
    name: 'AdminLogin',
    component: () => import('@/core/views/admin/BaseLoginAdministration.vue'), // Login page without BaseLayout
  },
  //Add here routers from other modules {path/name/component/meta}
];

const history = createWebHistory(import.meta.env.BASE_URL);
let isTokenValidated = false;

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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(); // Esto se llama en cada navegación
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Lógica de validación de token principal
  if (requiresAuth) {
    const token = Cookies.get('token');
    const storeToken = authStore.getToken;
    const isAuthenticated = UtilBase.exist(token) && token === storeToken;

    if (!isAuthenticated && token && !isTokenValidated) {
      try {
        await authStore.validateToken(); // Llamada a la API
        isTokenValidated = true;
        const updatedToken = Cookies.get('token');
        const updatedStoreToken = authStore.getToken;
        const fullyAuthenticated =
          UtilBase.exist(updatedToken) && updatedToken === updatedStoreToken;

        if (fullyAuthenticated) {
          if (to.name === 'AdminLogin') {
            return next({ name: 'Dashboard' });
          }
          return next();
        } else {
          // Token no válido, redirige a login
          isTokenValidated = false;
          return next({ name: 'AdminLogin' });
        }
      } catch (error) {
        isTokenValidated = false;
        return next({ name: 'AdminLogin' });
      }
    } else if (isAuthenticated) {
      if (to.name === 'AdminLogin') {
        return next({ name: 'Dashboard' });
      }
      return next();
    } else {
      // No está autenticado y no tiene un token para validar o ya falló la validación
      return next({ name: 'AdminLogin' });
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  window.scrollTo(0, 0); //volvemos al top de la pagina

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
