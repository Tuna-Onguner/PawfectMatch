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
import { GranteeApp } from '../../../__models/application_models';
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
  grantApplications: GranteeApp[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // Fetch or set your grant applications data here
    this.grantApplications = [
      {
        aoId: 1,
        gappAmount: 10000,
        gappDate: new Date(),
        gappFile: null, // Assuming the file is stored as binary data
        gappStatus: 'Pending',
        gappResponseDate: new Date(),
        gMotivationText: 'Sample motivation text',
        gappDecidedAmount: 0, // Default value, update as needed
        gadminId: 123,
      },
      // Add more applications as needed
    ];
  }

  showApplicationDetails(grant: GranteeApp) {
    this.dialog.open(DetailGranteeApplicationsComponent, {
      width: '400px', // Adjust the width as needed
      data: grant
    });
  }

  acceptApplication(grant: GranteeApp) {
    grant.gappStatus = 'Accepted';
  }

  rejectApplication(grant: GranteeApp) {
    grant.gappStatus = 'Rejected';
  }
}