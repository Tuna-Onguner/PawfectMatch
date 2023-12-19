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
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";
import { OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list'; // Add this line for MatListModule
import {MatCardModule} from "@angular/material/card";
import { Agreement } from '../../../models/applications';
import { FormsModule } from '@angular/forms';
import { DetailVetAgreementComponent } from '../detail-vet-agreement/detail-vet-agreement.component';

@Component({
  selector: 'app-find-veterinarians',
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
    MatDialogModule,
  ],
  templateUrl: './find-veterinarians.component.html',
  styleUrl: './find-veterinarians.component.css'
})
export class FindVeterinariansComponent implements OnInit {
  agreements: Agreement[] = []; // You need to fetch or set your agreements data

  constructor(private dialog: MatDialog) {}
  newAgreement: Agreement = {
    id: 0,
    organizationId: 0, // Set appropriately
    organizationName: '',
    veterinarianId: 0, // Set appropriately
    veterinarianName: '',
    agreementDate: new Date(),
    agreementText: '', // You can add this property if needed
    file: null,
    petBreed: '',
  };

  ngOnInit() {
    // Fetch or set your agreements data here
    this.agreements = [
      {
        id: 1,
        organizationId: 123,
        organizationName: 'XYZ Foundation',
        veterinarianId: 456,
        veterinarianName: 'Dr. Smith',
        agreementDate: new Date(),
        agreementText: 'Sample agreement text',
        file: null,
        petBreed: 'Dog',
      },
      // Add more agreements as needed
    ];
  }

  showAgreementDetails(agreement: Agreement) {
    const dialogRef = this.dialog.open(DetailVetAgreementComponent, {
      width: '300px', // Adjust the width as needed
      data: agreement
    });
  }
  makeNewAgreement() {
    // Implement logic to submit the new agreement
    // You can use this.newAgreement to access the form data
    // and send it to your backend service. Handle file uploads appropriately.
    console.log('New agreement submitted:', this.newAgreement);
    
    // Clear the form after submission
    this.newAgreement = {
      id: 0,
      organizationId: 0, // Set appropriately
      organizationName: '',
      veterinarianId: 0, // Set appropriately
      veterinarianName: '',
      agreementDate: new Date(),
      agreementText: '', // You can add this property if needed
      file: null,
      petBreed: '',
    };
  }

  handleFileInput(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.newAgreement.file = fileList[0];
    }
  }
}
