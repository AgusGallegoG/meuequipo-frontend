import { useAuthStore } from '@/auth/store/authStore';
import { calendarRouter, calendarRouterAdmin } from '@/calendar/router/calendar.routes';
import { categoryRouterAdmin } from '@/category/router/category.routes';
import { UtilBase } from '@/core/utilities/UtilBase';
import { signinRouterAdmin } from '@/player/router/player.routes';
import { publicationRouter, publicationRouterAdmin } from '@/publication/router/publication.routes';
import { rivalsRouterAdmin } from '@/rivals/router/rivals.routes';
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
      ...signinRouterAdmin,
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
const isTokenValidated = false;

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
  const authStore = useAuthStore();

  const token = Cookies.get('token');
  const storeToken = authStore.getToken;
  const isAuthenticated = UtilBase.exist(token) && token === storeToken;

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // Nos aseguramos que cualquier ruta cuyo padre sea admin se considere que necesita auth

  //Validamos el token de inicio de sesion por si esta cacheado una vez:
  if (!isTokenValidated && requiresAuth) {
    try {
      await authStore.validateToken();
    } catch (error) {
      next({ name: 'AdminLogin' });
    }
  }

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'AdminLogin' }); // Redirect to login if not authenticated
  } else if (to.name === 'AdminLogin' && isAuthenticated) {
    next({ name: 'Dashboard' }); // Prevent logged-in users from seeing login
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
