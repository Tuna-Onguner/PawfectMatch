import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { RegisterOrganizationComponent} from "./register-organization/register-organization.component";
import {MainAdopterPageComponent} from "./main-adopter-page/main-adopter-page.component";
import {AdoptionAdopterPageComponent} from "./adoption-adopter-page/adoption-adopter-page.component";
import {RegisterPetDialogComponent} from "./register-pet-dialog/register-pet-dialog.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponentComponent},
  {path: 'register-organization', component: RegisterOrganizationComponent},
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path: 'main-adopter-page',
    component: MainAdopterPageComponent,
    children: [
      {path: 'adopter-adoption-page', component: AdoptionAdopterPageComponent},
      {path: 'register-pet-dialog', component: RegisterPetDialogComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RegisterComponentComponent,
  RegisterOrganizationComponent],
  exports: [RouterModule]

})
export class AppRoutingModule { }
