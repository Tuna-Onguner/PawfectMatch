import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { RegisterOrganizationComponent} from "./register-organization/register-organization.component";
import {MainAdopterPageComponent} from "./main-adopter-page/main-adopter-page.component";
import {AdoptionAdopterPageComponent} from "./adoption-adopter-page/adoption-adopter-page.component";
import {RegisterPetDialogComponent} from "./register-pet-dialog/register-pet-dialog.component";
import {BlogReadPageComponent} from "./blog-read-page/blog-read-page.component";
import {ExpertAdvicePageComponent} from "./expert-advice-page/expert-advice-page.component";
import {BlogCreatePageComponent} from "./blog-create-page/blog-create-page.component";
import {DonationPageComponent} from "./donation-page/donation-page.component";
import {VetViewPageComponent} from "./vet-view-page/vet-view-page.component";
import {OwnedPetsViewComponent} from "./owned-pets-view/owned-pets-view.component";
import {ProfileViewComponent} from "./profile-view/profile-view.component";
import {ApplicationsViewComponent} from "./applications-view/applications-view.component";
import {ReservationsViewComponent} from "./reservations-view/reservations-view.component";
import {ExaminationsComponent} from "./examinations/examinations.component";
import {OverseeingPageComponent} from "./overseeing-page/overseeing-page.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponentComponent},
  {path: 'register-organization', component: RegisterOrganizationComponent},
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path: 'main-adopter-page',
    component: MainAdopterPageComponent,
    children: [
      {path: 'adopter-adoption-page', component: AdoptionAdopterPageComponent},
      {path: 'register-pet-dialog', component: RegisterPetDialogComponent},
      {path: 'blog-read-page', component: BlogReadPageComponent},
      {path: 'ask-expert-page', component: ExpertAdvicePageComponent},
      {path: 'blog-create-page', component: BlogCreatePageComponent},
      {path: 'donation-page', component: DonationPageComponent},
      {path: 'vet-view-page', component: VetViewPageComponent},
      {path: 'owned-pets-view', component: OwnedPetsViewComponent},
      {path: 'profile-view', component: ProfileViewComponent},
      {path: 'applications-view', component: ApplicationsViewComponent},
      {path: 'reservations-view', component: ReservationsViewComponent},
      {path: 'examinations-view', component: ExaminationsComponent},
      {path: 'oversight-view', component: OverseeingPageComponent},
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
