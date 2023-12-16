import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { DetailExamResultsComponent } from '../detail-exam-results/detail-exam-results.component';

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
  templateUrl: './upload-exam-results.component.html',
  styleUrls: ['./upload-exam-results.component.css']
})
export class UploadExamResultsComponent {
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  startTime = 8 * 60 + 30; // 8:30 AM in minutes
  endTime = 17 * 60 + 30; // 5:30 PM in minutes
  timeSlots: string[] = [];

  constructor(private dialog: MatDialog) {
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

  openUploadFileDialog(selectedSlot: string) {
    const dialogRef = this.dialog.open(DetailExamResultsComponent, {
      width: '400px',
      data: { selectedSlot: selectedSlot }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle actions after the dialog is closed, if needed
    });
  }
}
