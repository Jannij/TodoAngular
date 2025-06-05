import {RouterModule, Routes } from '@angular/router';
import {TodoComponent} from './components/create/create.component';
import {AuthGuard} from './components/login/auth.guard';
import {LoginComponent} from './components/login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/todo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

