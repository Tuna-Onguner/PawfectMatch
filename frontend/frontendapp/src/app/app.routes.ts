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
import {MakeAgreementsComponent} from "./make-agreements/make-agreements.component";
import {DetailAgreementsComponent} from "./detail-agreements/detail-agreements.component";
import {PublishSchedulesComponent} from "./publish-schedules/publish-schedules.component";
import {SchedulingRequestsComponent} from "./scheduling-requests/scheduling-requests.component";
import {DetailAppointmentsComponent} from "./detail-appointments/detail-appointments.component";
import {UploadExamResultsComponent} from "./upload-exam-results/upload-exam-results.component";
import {DetailExamResultsComponent} from "./detail-exam-results/detail-exam-results.component";
import {HomeComponent} from "./home/home.component";
import {DetailPetComponent} from "./detail-pet/detail-pet.component";
import {AddPetComponent} from "./add-pet/add-pet.component";
import {AdoptionApplicationsComponent} from "./adoption-applications/adoption-applications.component";
import {DetailAdoptionApplicationComponent} from "./detail-adoption-application/detail-adoption-application.component";
import {ApplyForGrantsComponent} from "./apply-for-grants/apply-for-grants.component";
import {FindVeterinariansComponent} from "./find-veterinarians/find-veterinarians.component";
import {DetailVetAgreementComponent} from "./detail-vet-agreement/detail-vet-agreement.component";
import {ReceiveDonationsComponent} from "./receive-donations/receive-donations.component";
import {RequestOverseeComponent} from "./request-oversee/request-oversee.component";
import {DetailOverseeComponent} from "./detail-oversee/detail-oversee.component";
import {UserAdministrationComponent} from "./user-administration/user-administration.component";
import {DetailUserComponent} from "./detail-user/detail-user.component";
import {BloggerApplicationsComponent} from "./blogger-applications/blogger-applications.component";
import {DetailBlogApplicationsComponent} from "./detail-blog-applications/detail-blog-applications.component";
import {ExpertApplicationsComponent} from "./expert-applications/expert-applications.component";
import {DetailExpertApplicationsComponent} from "./detail-expert-applications/detail-expert-applications.component";
import {GranteeApplicationsComponent} from "./grantee-applications/grantee-applications.component";
import {DetailGranteeApplicationsComponent} from "./detail-grantee-applications/detail-grantee-applications.component";
import {TransferringDonationsComponent} from "./transferring-donations/transferring-donations.component";
import {DetailTransferComponent} from "./detail-transfer/detail-transfer.component";

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
  {path: 'make-agreements',
    component: MakeAgreementsComponent,
    children: [
      {path: 'detail-agreements', component: DetailAgreementsComponent},
    ]
    },
    { path: '', redirectTo: '/make-agreements', pathMatch: 'full' },
    { path: 'publish-schedule', component: PublishSchedulesComponent },
    { path: 'scheduling-request', component: SchedulingRequestsComponent,
      children: [
        {path: 'detail-appointmes', component: DetailAppointmentsComponent},
      ] },
    {path: 'upload-exam-results', component: UploadExamResultsComponent,
      children: [
      {path: 'detail-exam-results', component: DetailExamResultsComponent},
    ]},
  {path: 'home-organization', component: HomeComponent,
        children: [
            {path:'detail-pet',component: DetailPetComponent}]
        },
    { path: '', redirectTo: '/home-organization', pathMatch: 'full' },
    {path: 'add-pet', component: AddPetComponent},
    {path: 'adoption-applications', component: AdoptionApplicationsComponent,
    children: [
        {path:'detail-adoption-application',component: DetailAdoptionApplicationComponent}]
    },
    {path: 'apply-for-grants', component: ApplyForGrantsComponent},
    {path: 'find-veterinarians', component: FindVeterinariansComponent,
    children: [
        {path:'detail-vet-agreement',component: DetailVetAgreementComponent}]
    },
    {path: 'receive-donations', component: ReceiveDonationsComponent},
    {path: 'request-oversee', component: RequestOverseeComponent,
    children: [
        {path:'detail-oversee',component: DetailOverseeComponent}]
    },
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
  imports: [RouterModule.forRoot(routes),
  RegisterComponentComponent,
  RegisterOrganizationComponent],
  exports: [RouterModule]


})
export class AppRoutingModule { }
