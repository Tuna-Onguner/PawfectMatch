import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MakeAgreementsComponent } from './make-agreements/make-agreements.component';

export const routes: Routes = [
    { path: 'make-agreements', component: MakeAgreementsComponent },
    { path: '', redirectTo: '/make-agreements', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
