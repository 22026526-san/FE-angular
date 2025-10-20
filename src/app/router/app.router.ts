import { Routes } from '@angular/router';
// import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
// import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { HeaderFooterOnlyComponent } from '../layouts/head-foot-only/header-footer-only.component';

export const routes: Routes = [
  // Routes không có layout (null layout)
  //   { path: 'login', component: LoginComponent },
  //   { path: 'register', component: RegisterComponent },
  //   { path: 'forget_pass', component: ForgetPasswordComponent },

  // Routes với Header-Footer Only Layout
  {
    path: '',
    component: HeaderFooterOnlyComponent,
    children: [
      // { path: 'product/:name', component: ProductDetailComponent },
      // { path: 'cart', component: CartComponent },
      // { path: 'products/:object_name/:port_name', component: ListPortfolioComponent },
      {
        path: '', // ✅ Route mặc định khi vào '/'
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('../features/HomePage/home.component').then((m) => m.HomePage),
      },
    ],
  },
];
