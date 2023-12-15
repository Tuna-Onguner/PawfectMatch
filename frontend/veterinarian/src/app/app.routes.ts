import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MakeAgreementsComponent } from './make-agreements/make-agreements.component';
import { PublishSchedulesComponent } from './publish-schedules/publish-schedules.component';
import { SchedulingRequestsComponent } from './scheduling-requests/scheduling-requests.component';
import { UploadExamResultsComponent } from './upload-exam-results/upload-exam-results.component';
import { DetailAgreementsComponent } from './detail-agreements/detail-agreements.component';


export const routes: Routes = [
    {path: 'make-agreements',
        component: MakeAgreementsComponent,
        children: [
        {path: 'detail-agreements', component: DetailAgreementsComponent},
        ]
    },
    { path: '', redirectTo: '/make-agreements', pathMatch: 'full' },
    { path: 'publish-schedule', component: PublishSchedulesComponent },
    { path: 'scheduling-request', component: SchedulingRequestsComponent },
    {path: 'upload-exam-results', component: UploadExamResultsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
