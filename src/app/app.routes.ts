import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadComponent: () => import('./core/layout/main-layout/main-layout').then((m) => m.MainLayout),
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () => import('./features/home/home/home').then((m) => m.Home),
  //       canActivate: [authGuard, roleGuard],
  //       data: {
  //         roles: ['ROLE_USER']
  //       }
  //     },
  //     {
  //       path: 'characters',
  //       loadComponent: () =>
  //         import('./features/characters/character-list/character-list').then(
  //           (m) => m.CharacterList,
  //         ),
  //       canActivate: [authGuard, roleGuard],
  //       data: {
  //         roles: ['ROLE_USER'],
  //       },
  //     },
  //     {
  //       path: 'bosses',
  //       loadComponent: () =>
  //         import('./features/bosses/boss-list/boss-list').then((m) => m.BossList),
  //       canActivate: [authGuard, roleGuard],
  //       data: {
  //         roles: ['ROLE_USER']
  //       }
  //     },
  //   ],
  // },
  {
    path: '',
    loadComponent: () => import('./core/layout/main-layout/main-layout').then((m) => m.MainLayout),

    canActivateChild: [authGuard, roleGuard],
    data: {
      roles: ['ROLE_USER'],
    },

    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home/home').then((m) => m.Home),
      },
      {
        path: 'characters',
        loadComponent: () =>
          import('./features/characters/character-list/character-list').then(
            (m) => m.CharacterList,
          ),
      },
      {
        path: 'bosses',
        loadComponent: () =>
          import('./features/bosses/boss-list/boss-list').then((m) => m.BossList),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
    canActivate: [guestGuard],
  },
  {
    path: 'not-found',
    loadComponent: () => import('./shared/not-found/not-found').then((m) => m.NotFound),
    canActivate: [roleGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
    },
  },
  {
    path: 'admin/home',
    loadComponent: () =>
      import('./features/dashboard/admin/admin-home/admin-home').then((m) => m.AdminHome),
    canActivate: [roleGuard],
    data: {
      roles: ['ROLE_ADMIN'],
    },
  },
  {
    path: '**',
    loadComponent: () => import('./shared/not-found/not-found').then((m) => m.NotFound),
  },
];
