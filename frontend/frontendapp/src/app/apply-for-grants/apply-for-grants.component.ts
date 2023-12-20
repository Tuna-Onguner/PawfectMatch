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
import { GranteeApp } from '../../../__models/application_models';
import { DetailGranteeApplicationsComponent } from '../detail-grantee-applications/detail-grantee-applications.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './apply-for-grants.component.html',
  styleUrl: './apply-for-grants.component.css'
})
export class ApplyForGrantsComponent implements OnInit {
  grantApplications: GranteeApp[] = []; // Populate this array with actual data
  constructor(private dialog: MatDialog) {}
  ngOnInit() {
    // Fetch or set your grant applications data here
    this.grantApplications = [
      {
        aoId: 123,
        gappAmount: 5000,
        gappDate: new Date('2023-01-01'),
        gappFile: new Blob([/* binary data */]),
        gappStatus: 'Pending',
        gappResponseDate: new Date('2023-01-10'),
        gMotivationText: 'This is a sample motivation text.',
        gappDecidedAmount: 4500,
        gadminId: 456
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
