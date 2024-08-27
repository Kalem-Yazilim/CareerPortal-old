import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { ErrorRoutingModule } from './modules/error-routing/error-routing.module';
import { UncaughtErrorComponent } from './modules/error-routing/error/uncaught-error.component';
import { PageNotFoundComponent } from './modules/error-routing/not-found/not-found.component';
import { MainLayoutComponent } from './modules/main-layout/main-layout.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component:MainLayoutComponent,
    loadChildren: () =>
      import('./modules/main-layout/main-layout.module').then(
        (m) => m.MainLayoutModule
      ),
  },
  {
    path: 'error',
    component: UncaughtErrorComponent,
  },
  { path: '**', component: PageNotFoundComponent }, //Sonda olmalı
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    ErrorRoutingModule,
  ],
  exports: [RouterModule, ErrorRoutingModule],
})
export class AppRoutingModule {}
