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
    path: 'loja',
    canActivate: [loginGuard],
    loadComponent: () => import('./pages/loja/loja.page').then( m => m.LojaPage)
  },
  {
    path: 'home',
    canActivate: [loginGuard],
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'detalhes-jogo/:id',
    loadComponent: () => import('./pages/detalhes-jogo/detalhes-jogo.page').then( m => m.DetalhesJogoPage)
  },
 
  
];
