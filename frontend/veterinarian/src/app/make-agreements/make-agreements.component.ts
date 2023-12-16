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
import { Agreement } from '../../../models/veterinarian_models'; // Replace with the correct path
import { OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list'; // Add this line for MatListModule
import {MatCardModule} from "@angular/material/card";
import { DetailAgreementsComponent } from '../detail-agreements/detail-agreements.component';

@Component({
  selector: 'app-make-agreements',
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
  templateUrl: './make-agreements.component.html',
  styleUrl: './make-agreements.component.css'
})
export class MakeAgreementsComponent implements OnInit {
  agreements: Agreement[] = []; // Populate this array with your data

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // In a real application, you would fetch agreements data from a service
    // For now, we'll mock some data for demonstration purposes
    this.agreements = this.getMockAgreements();
  }

  showDetails(agreement: Agreement) {
    this.dialog.open(DetailAgreementsComponent, {
      data: agreement  // Pass the agreement directly without the extra 'data' property
    });
  }
  
  applyAgreement(agreement: Agreement) {
    // This method is called when the detail button is clicked
    // You can implement logic to show the details for the selected agreement
    // For now, let's log the details to the console
    console.log('Selected Agreement:', agreement);
  }
  rejectAgreement(agreement: Agreement) { // This method is called when the detail button is clicked
    // You can implement logic to show the details for the selected agreement
    // For now, let's log the details to the console
    console.log('Selected Agreement:', agreement);
  }

  private getMockAgreements(): Agreement[] {
    // This method provides mock data for demonstration purposes
    return [
      {
        agreementId: 1,
        organizationName: 'Organization A',
        agreementText: 'Agreement text for Organization A',
        beginDate: new Date('2023-01-01'),
        endDate: new Date('2023-12-31'),
        agreementStatus: 'Active',
      },
      {
        agreementId: 2,
        organizationName: 'Organization B',
        agreementText: 'Agreement text for Organization B',
        beginDate: new Date('2023-02-01'),
        endDate: new Date('2023-11-30'),
        agreementStatus: 'Inactive',
      },
      {
        agreementId: 3,
        organizationName: 'Organization B',
        agreementText: 'Agreement text for Organization B',
        beginDate: new Date('2023-02-01'),
        endDate: new Date('2023-11-30'),
        agreementStatus: 'Inactive',
      },
      {
        agreementId: 4,
        organizationName: 'Organization B',
        agreementText: 'Agreement text for Organization B',
        beginDate: new Date('2023-02-01'),
        endDate: new Date('2023-11-30'),
        agreementStatus: 'Inactive',
      },
      // Add more mock agreements as needed
    ];
  }
}