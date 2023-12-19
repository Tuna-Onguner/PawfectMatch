import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import { OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list'; // Add this line for MatListModule
import {MatCardModule} from "@angular/material/card";
import { AdoptionApp } from "../../../__models/application_models" // Replace with the correct path
import { DetailAdoptionApplicationComponent } from '../detail-adoption-application/detail-adoption-application.component'; // Import the detail component

@Component({
  selector: 'app-adoption-applications',
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
  templateUrl: './adoption-applications.component.html',
  styleUrl: './adoption-applications.component.css'
})
export class AdoptionApplicationsComponent implements OnInit {
  adoptionApplications: AdoptionApp[] = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // In a real application, you would fetch adoption applications data from a service
    // For now, we'll mock some data for demonstration purposes
    this.adoptionApplications = this.getMockAdoptionApplications();
  }

  showDetails(application: AdoptionApp) {
    this.dialog.open(DetailAdoptionApplicationComponent, {
      data: application,
    });
  }

  acceptApplication(application: AdoptionApp) {
    application.aapp_status = 'Accepted';
  }

  rejectApplication(application: AdoptionApp) {
    application.aapp_status = 'Rejected';
  }

  private getMockAdoptionApplications(): AdoptionApp[] {
    // Mock data for demonstration purposes
    return [
      {
        adopter_id: 101,
        ao_id: 1,
        aapp_date: new Date('2023-01-15'),
        pet_id: 1,
        petName: 'Fluffy',
        aapp_file: '',
        aapp_status: 'Pending',
        aapp_response_date: null,
        amotivation_text: 'We have a loving home for Fluffy!',
      },
      {
        adopter_id: 102,
        ao_id: 2,
        aapp_date: new Date('2023-02-20'),
        pet_id: 2,
        petName: 'Buddy',
        aapp_file: '',
        aapp_status: 'Approved',
        aapp_response_date: new Date('2023-02-25'),
        amotivation_text: 'Our family is excited to welcome Buddy!',
      },
      {
        adopter_id: 103,
        ao_id: 1,
        aapp_date: new Date('2023-03-10'),
        pet_id: 3,
        petName: 'Max',
        aapp_file: '',
        aapp_status: 'Pending',
        aapp_response_date: null,
        amotivation_text: 'Max will be a great addition to our home!',
      },
      // Add more mock adoption applications as needed
    ];
  }
}
