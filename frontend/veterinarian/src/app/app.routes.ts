import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeAgreementsComponent } from './make-agreements/make-agreements.component';
import { SchedulingRequestsComponent } from './scheduling-requests/scheduling-requests.component';
import { UploadExamResultsComponent } from './upload-exam-results/upload-exam-results.component';
import { PublishSchedulesComponent } from './publish-schedules/publish-schedules.component';
import { LogoutComponent } from './logout/logout.component';
import { MainScreenComponent } from './main-screen/main-screen.component';

export const routes: Routes = [
  { path: 'make-agreements', component: MakeAgreementsComponent },
  { path: 'scheduling-requests', component: SchedulingRequestsComponent },
  { path: 'upload-exam-results', component: UploadExamResultsComponent },
  { path: 'publish-schedules', component: PublishSchedulesComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: MainScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
