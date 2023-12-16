import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserAdministrationComponent } from './user-administration/user-administration.component';
import { BloggerApplicationsComponent } from './blogger-applications/blogger-applications.component';
import { ExpertApplicationsComponent } from './expert-applications/expert-applications.component';
import { GranteeApplicationsComponent } from './grantee-applications/grantee-applications.component';
import { TransferringDonationsComponent } from './transferring-donations/transferring-donations.component';
import { DetailUserComponent } from './detail-user/detail-user.component';


export const routes: Routes = [
    {path: 'user-administration', component: UserAdministrationComponent,
    children: [
        {path: 'detail-user', component: DetailUserComponent},
      ]},
    { path: '', redirectTo: '/user-administration', pathMatch: 'full' },
    {path: 'blogger-applications', component: BloggerApplicationsComponent},
    { path: '', redirectTo: '/user-administration', pathMatch: 'full' },
    {path: 'expert-applications', component: ExpertApplicationsComponent},
    {path: 'grantee-applications', component: GranteeApplicationsComponent},
    {path: 'transferring-donations', component: TransferringDonationsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

