import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home').then(m => m.Home)
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./auth/register/register').then(m => m.Register)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login').then(m => m.Login)
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'add-transaction',
        loadComponent: () =>
            import('./transaction/add/add').then(m => m.Add)
    },
    {
        path: 'list-transaction',
        loadComponent: () =>
            import('./transaction/list/list').then(m => m.List)
    },
    {
        path: 'reports',
        loadComponent: () =>
            import('./report/report').then(m => m.Report)
    }
];
