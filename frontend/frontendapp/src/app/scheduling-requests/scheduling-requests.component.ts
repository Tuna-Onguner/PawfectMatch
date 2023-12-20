import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Appointments } from '../../../models/veterinarian_models'; // Replace with the correct path
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'; // Add this line for MatListModule
import {MatCardModule} from "@angular/material/card";
import { DetailAppointmentsComponent } from '../detail-appointments/detail-appointments.component';

@Component({
  selector: 'app-scheduling-requests',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    MatSidenavModule,
    RouterOutlet,
    MatListModule,
    MatCardModule,
  ],
  templateUrl: './scheduling-requests.component.html',
  styleUrl: './scheduling-requests.component.css'
})
export class SchedulingRequestsComponent implements OnInit {
  appointments: Appointments[] = []; // Populate this array with your data

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // In a real application, you would fetch appointments data from a service
    // For now, we'll mock some data for demonstration purposes
    this.appointments = this.getMockAppointments();
  }

  showDetails(appointment: Appointments) {
    this.dialog.open(DetailAppointmentsComponent, {
      data: appointment  // Pass the agreement directly without the extra 'data' property
    });
  }
  applyAppointment(appointment: Appointments) {
    appointment.appointmentStatus = 'Accepted';
  }
  rejectAppointment(appointment: Appointments) { 
    appointment.appointmentStatus = 'Rejected';
  }
  private getMockAppointments(): Appointments[] {
    // This method provides mock data for demonstration purposes
    return [
      {
        appointmentId: 1,
        veterinarianId: 1,
        petId: 1,
        appointmentDate: new Date('2023-01-05'),
        appointmentTime: '10:00 AM',
        appointmentStatus: 'Scheduled',
        adopterId: 2,
        reason: 'Regular Checkup',
      },
      {
        appointmentId: 2,
        veterinarianId: 1,
        petId: 2,
        appointmentDate: new Date('2023-01-10'),
        appointmentTime: '02:30 PM',
        appointmentStatus: 'Pending',
        adopterId: 3,
        reason: 'Vaccination',
      },
      // Add more mock appointments as needed
    ];
  }
}
