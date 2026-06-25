import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/main-layout/main-layout').then((m) => m.MainLayout),
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
];
