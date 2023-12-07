import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { RegisterOrganizationComponent} from "./register-organization/register-organization.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponentComponent},
  {path: 'register-organization', component: RegisterOrganizationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RegisterComponentComponent,
  RegisterOrganizationComponent],
  exports: [RouterModule]

})
export class AppRoutingModule { }
