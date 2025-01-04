import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './Employee-apps/Employee-List/employee-list.component';

const routes: Routes = [
  {path: '',component: EmployeeListComponent},
  {path: 'Employee',component: EmployeeListComponent},
  {path: 'login',component: EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
