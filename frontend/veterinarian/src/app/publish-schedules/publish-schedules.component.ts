import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-upload-exam-results',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    MatSidenavModule,
    RouterOutlet,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './publish-schedules.component.html',
  styleUrl: './publish-schedules.component.css'
})
export class PublishSchedulesComponent {
  publishSchedule(week: string) {
    // Implement logic to publish the schedule for the specified week
    console.log(`Publishing schedule for ${week}`);
  }
}
