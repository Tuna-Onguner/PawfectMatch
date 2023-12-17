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
import { GrantApplication } from '../../../models/applications-models';
import { DetailGranteeApplicationsComponent } from '../detail-grantee-applications/detail-grantee-applications.component';

@Component({
  selector: 'app-grantee-applications',
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
  templateUrl: './grantee-applications.component.html',
  styleUrl: './grantee-applications.component.css'
})
export class GranteeApplicationsComponent implements OnInit {
  grantApplications: GrantApplication[] = []; // Populate this array with actual data
  constructor(private dialog: MatDialog) {}
  ngOnInit() {
    // Fetch or set your grant applications data here
    this.grantApplications = [
      {
        // Sample data for demonstration
        id: 1,
        userId: 123,
        userName: 'John Doe',
        userEmailAddress: 'john.doe@example.com',
        userPhoneNumber: '123-456-7890',
        status: 'Pending',
        organizationId: 456,
        organizationName: 'XYZ Foundation',
        applicationDate: new Date(),
        motivation: 'Sample motivation text',
        responseDate: new Date(),
        amountNeeded: 10000,
      },
      // Add more applications as needed
    ];
  }
  showApplicationDetails(grant: GrantApplication) {
    this.dialog.open(DetailGranteeApplicationsComponent, {
      width: '400px', // Adjust the width as needed
      data: grant
    });
  }
  acceptApplication(grant: GrantApplication) {
    grant.status = 'Accepted';
  }
  rejectApplication(grant: GrantApplication) {
    grant.status = 'Rejected';
  }
}

