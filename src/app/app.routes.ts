import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { guestGuard } from './core/guards/guest-guard';
import { noOngoingBattleGuardGuard } from './core/guards/no-ongoing-battle-guard-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'game',
    loadComponent: () => import('./core/layout/main-layout/main-layout').then((m) => m.MainLayout),
    canActivateChild: [authGuard, roleGuard],
    data: {
      roles: ['ROLE_USER'],
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
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
      {
        path: 'battles/:battleId',
        loadComponent: () =>
          import('./features/battles/pages/battle-game-page/battle-game-page').then(
            (m) => m.BattleGamePage,
          ),
      },
      {
        path: 'battles',
        loadComponent: () =>
          import('./features/battles/history/battle-history/battle-history').then(
            (m) => m.BattleHistory,
          ),
      },

      {
        path: 'shop',
        loadComponent: () => import('./features/shop/shop/shop').then((m) => m.Shop),
      },
      {
        path: 'recharge',
        loadComponent: () =>
          import('./features/recharge/recharge/recharge').then((m) => m.Recharge),
      },
      {
        path: 'battle',
        canActivateChild: [noOngoingBattleGuardGuard],
        children: [
          {
            path: 'start/characters',
            loadComponent: () =>
              import('./features/battles/pages/character-select-page/character-select-page').then(
                (m) => m.CharacterSelectPage,
              ),
          },
          {
            path: 'start/bosses/:characterId',
            loadComponent: () =>
              import('./features/battles/pages/boss-select-page/boss-select-page').then(
                (m) => m.BossSelectPage,
              ),
          },
          {
            path: 'loading/:characterId/:bossId',
            loadComponent: () =>
              import('./features/battles/pages/battle-loading-page/battle-loading-page').then(
                (m) => m.BattleLoadingPage,
              ),
          },
        ],
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
