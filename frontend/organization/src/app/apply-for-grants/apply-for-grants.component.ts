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
import { FormsModule } from '@angular/forms';
import { GrantApplication } from '../../../models/applications';
import { DetailGranteeApplicationsComponent } from '/Users/sarperardabakir/Desktop/PawfectMatch/frontend/admin/src/app/detail-grantee-applications/detail-grantee-applications.component'
@Component({
  selector: 'app-apply-for-grants',
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
    FormsModule,
  ],
  templateUrl: './apply-for-grants.component.html',
  styleUrl: './apply-for-grants.component.css'
})
export class ApplyForGrantsComponent implements OnInit {
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
        file: null,
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


  motivation: string = '';
  amountNeeded: number = 0;
  selectedFile: File | null = null;

  // Method to handle file input change
  handleFileInput(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  // Method to handle grant application submission
  applyForGrant(): void {
    // Add your logic to submit the grant application
    // You can use this.motivation, this.amountNeeded, and this.selectedFile
    // to access the form data and send it to your backend service.
    // Make sure to handle file uploads appropriately.
    console.log('Grant application submitted:', this.motivation, this.amountNeeded, this.selectedFile);
  }
}
