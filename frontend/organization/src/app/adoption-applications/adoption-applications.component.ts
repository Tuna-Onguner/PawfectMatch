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
import { AdoptionApplication } from '../../../models/applications'; // Replace with the correct path
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
  adoptionApplications: AdoptionApplication[] = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // In a real application, you would fetch adoption applications data from a service
    // For now, we'll mock some data for demonstration purposes
    this.adoptionApplications = this.getMockAdoptionApplications();
  }

  showDetails(application: AdoptionApplication) {
    this.dialog.open(DetailAdoptionApplicationComponent, {
      data: application
    });
  }

  acceptApplication(application: AdoptionApplication) {
    application.status = 'Accepted';
  }
  rejectApplication(application: AdoptionApplication) {
    application.status = 'Rejected';
  }

  private getMockAdoptionApplications(): AdoptionApplication[] {
    // Mock data for demonstration purposes
    return [
      {
        id: 1,
        petId: 1,
        petName: 'Fluffy',
        userId: 101,
        userName: 'John Doe',
        userEmailAddress: 'john@example.com',
        userPhoneNumber: '555-1234',
        status: 'Pending',
        organizationId: 1,
        organizationName: 'Pet Rescue',
        applicationDate: new Date('2023-01-15'),
        motivation: 'We have a loving home for Fluffy!'
      },
      {
        id: 2,
        petId: 2,
        petName: 'Buddy',
        userId: 102,
        userName: 'Jane Smith',
        userEmailAddress: 'jane@example.com',
        userPhoneNumber: '555-5678',
        status: 'Approved',
        organizationId: 2,
        organizationName: 'Animal Haven',
        applicationDate: new Date('2023-02-20'),
        motivation: 'Our family is excited to welcome Buddy!'
      },
      {
        id: 3,
        petId: 3,
        petName: 'Max',
        userId: 103,
        userName: 'Alice Johnson',
        userEmailAddress: 'alice@example.com',
        userPhoneNumber: '555-9876',
        status: 'Pending',
        organizationId: 1,
        organizationName: 'Pet Rescue',
        applicationDate: new Date('2023-03-10'),
        motivation: 'Max will be a great addition to our home!'
      },
      // Add more mock adoption applications as needed
    ];
  }
  
}