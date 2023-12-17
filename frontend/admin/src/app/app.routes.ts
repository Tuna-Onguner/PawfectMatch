import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserAdministrationComponent } from './user-administration/user-administration.component';
import { BloggerApplicationsComponent } from './blogger-applications/blogger-applications.component';
import { ExpertApplicationsComponent } from './expert-applications/expert-applications.component';
import { GranteeApplicationsComponent } from './grantee-applications/grantee-applications.component';
import { TransferringDonationsComponent } from './transferring-donations/transferring-donations.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { DetailBlogApplicationsComponent } from './detail-blog-applications/detail-blog-applications.component';
import { DetailExpertApplicationsComponent } from './detail-expert-applications/detail-expert-applications.component';
import { DetailGranteeApplicationsComponent } from './detail-grantee-applications/detail-grantee-applications.component';
import { DetailTransferComponent } from './detail-transfer/detail-transfer.component';


export const routes: Routes = [
    {path: 'user-administration', component: UserAdministrationComponent,
    children: [
        {path: 'detail-user', component: DetailUserComponent},
      ]},
    { path: '', redirectTo: '/user-administration', pathMatch: 'full' },
    {path: 'blogger-applications', component: BloggerApplicationsComponent,
    children: [
        {path: 'detail-blog-applications', component: DetailBlogApplicationsComponent},
      ]},
    { path: '', redirectTo: '/user-administration', pathMatch: 'full' },
    {path: 'expert-applications', component: ExpertApplicationsComponent,
        children: [
        {path: 'detail-expert-applications', component: DetailExpertApplicationsComponent},
      ]},
    {path: 'grantee-applications', component: GranteeApplicationsComponent,
    children: [
        {path: 'detail-grantee-applications', component: DetailGranteeApplicationsComponent},
      ]},
    {path: 'transferring-donations', component: TransferringDonationsComponent,    
    children: [
      {path: 'detail-transfer', component: DetailTransferComponent},
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

