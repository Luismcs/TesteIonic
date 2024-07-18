import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard'

export const routes: Routes = [
  {
    path: 'login',    
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [loginGuard],
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  
];
