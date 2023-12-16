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
  publishThisWeekSchedule() {
    // Get values from the form fields
    const week = 'This Week';
    const beginDate = (document.getElementById(`beginDate${week === 'This Week' ? '1' : '2'}`) as HTMLInputElement).value;
    const endDate = (document.getElementById(`endDate${week === 'This Week' ? '1' : '2'}`) as HTMLInputElement).value;
    const slotNumber = (document.getElementById(`slotNumber${week === 'This Week' ? '1' : '2'}`) as HTMLInputElement).value;
    const visibility = (document.getElementById(`visibility${week === 'This Week' ? '1' : '2'}`) as HTMLSelectElement).value;


    // Validate the form fields (you may add more validation logic as needed)
    if (!beginDate || !endDate || !slotNumber || !visibility) {
      alert('Please fill in all fields before publishing.');
      return;
    }

    // Implement logic to publish the schedule for the specified week
    console.log(`Publishing schedule for ${week}`);
    console.log('Begin Date:', beginDate);
    console.log('End Date:', endDate);
    console.log('Slot Number:', slotNumber);
    console.log('Visibility:', visibility);
  }
  publishNextWeekSchedule() {
    // Get values from the form fields
    const week = 'Next Week';
    const beginDate = (document.getElementById(`beginDate${week === 'Next Week' ? '1' : '2'}`) as HTMLInputElement).value;
    const endDate = (document.getElementById(`endDate${week === 'Next Week' ? '1' : '2'}`) as HTMLInputElement).value;
    const slotNumber = (document.getElementById(`slotNumber${week === 'Next Week' ? '1' : '2'}`) as HTMLInputElement).value;
    const visibility = (document.getElementById(`visibility${week === 'Next Week' ? '1' : '2'}`) as HTMLSelectElement).value;


    // Validate the form fields (you may add more validation logic as needed)
    if (!beginDate || !endDate || !slotNumber || !visibility) {
      alert('Please fill in all fields before publishing.');
      return;
    }

    // Implement logic to publish the schedule for the specified week
    console.log(`Publishing schedule for ${week}`);
    console.log('Begin Date:', beginDate);
    console.log('End Date:', endDate);
    console.log('Slot Number:', slotNumber);
    console.log('Visibility:', visibility);
  }
}
