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
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  startTime = 8 * 60 + 30; // 8:30 AM in minutes
  endTime = 17 * 60 + 30; // 5:30 PM in minutes
  timeSlots: string[] = [];

  constructor() {
    this.generateTimeSlots();
  }

  generateTimeSlots() {
    for (let i = this.startTime; i <= this.endTime; i += 30) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      this.timeSlots.push(time);
    }
  }
}
