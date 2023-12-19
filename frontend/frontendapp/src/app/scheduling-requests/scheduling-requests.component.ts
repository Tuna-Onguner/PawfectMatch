import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Reservation, Slot} from '../../../__models/functional_models'; // Replace with the correct path
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'; // Add this line for MatListModule
import {MatCardModule} from "@angular/material/card";
import { DetailAppointmentsComponent } from '../detail-appointments/detail-appointments.component';
import * as faker from 'faker';
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
  appointments: Reservation[] = []; // Populate this array with your data

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // In a real application, you would fetch appointments data from a service
    // For now, we'll mock some data for demonstration purposes
    this.appointments = this.getMockAppointments();
  }

  showDetails(appointment: Reservation) {
    this.dialog.open(DetailAppointmentsComponent, {
      data: appointment  // Pass the agreement directly without the extra 'data' property
    });
  }
  applyAppointment(appointment: Reservation) {
    appointment.rvStatus= 'Accepted';
  }
  rejectAppointment(appointment: Reservation){
    appointment.rvStatus = 'Rejected';
  }
  private getMockAppointments(): Reservation[] {
    // This method provides mock data for demonstration purposes
    let randomReservations: Reservation[] = [];
    for(let i = 0; i < 30; i++) {
        let slot: Slot = {
            slotId: faker.datatype.number({ min: 1, max: 100 }),
            scheduleId: faker.datatype.number({ min: 1, max: 100 }),
            isReserved: faker.datatype.boolean(),
            date: faker.date.future(),
            startHour: faker.date.future(),
            endHour: faker.date.future(),
        };

        let reservation: Reservation = {
            petId: faker.datatype.number({ min: 1, max: 100 }),
            adopterId: faker.datatype.number({ min: 1, max: 100 }),
            rvDate: faker.date.future(),
            rvStatus: faker.random.arrayElement(['Accepted', 'Rejected', 'Pending']),
            rvResponseDate: faker.date.future(),
            exId: faker.datatype.number({ min: 1, max: 100 }),
            reasoning: faker.lorem.paragraph(),
            slots: [slot]
        };

        randomReservations.push(reservation);
    }
    return randomReservations;

  }
}
