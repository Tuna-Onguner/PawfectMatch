import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddPetComponent } from './add-pet/add-pet.component';
import { HomeComponent } from './home/home.component';
import { AdoptionApplicationsComponent } from './adoption-applications/adoption-applications.component';
import { ApplyForGrantsComponent } from './apply-for-grants/apply-for-grants.component';
import { FindVeterinariansComponent } from './find-veterinarians/find-veterinarians.component';
import { ReceiveDonationsComponent } from './receive-donations/receive-donations.component';
import { RequestOverseeComponent } from './request-oversee/request-oversee.component';

export const routes: Routes = [
    {path: 'home-organization', component: HomeComponent},
    { path: '', redirectTo: '/home-organization', pathMatch: 'full' },
    {path: 'add-pet', component: AddPetComponent},
    {path: 'adoption-applications', component: AdoptionApplicationsComponent},
    {path: 'apply-for-grants', component: ApplyForGrantsComponent},
    {path: 'find-veterinarians', component: FindVeterinariansComponent},
    {path: 'receive-donations', component: ReceiveDonationsComponent},
    {path: 'request-oversee', component: RequestOverseeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
