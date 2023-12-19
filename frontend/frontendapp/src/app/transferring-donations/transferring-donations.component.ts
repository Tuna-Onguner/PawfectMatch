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
import { TransferringDonation } from '../../../models/applications-models';
import { DetailTransferComponent } from '../detail-transfer/detail-transfer.component';

@Component({
  selector: 'app-transferring-donations',
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
  templateUrl: './transferring-donations.component.html',
  styleUrl: './transferring-donations.component.css'
})
export class TransferringDonationsComponent implements OnInit {
  transferringDonations: TransferringDonation[] = []; // Assuming you have a data source

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch or initialize your transferring donations data
    this.transferringDonations = [
      // Populate with sample data or fetch from a service
      {
        id: 1,
        userId: 123,
        userName: 'John Doe',
        userEmailAddress: 'john.doe@example.com',
        userPhoneNumber: '123-456-7890',
        status: 'Pending',
        organizationId: 456,
        organizationName: 'Charity Organization',
        applicationDate: new Date(),
        responseDate: new Date(),
        amount: 1000
      },
      // Add more items as needed
    ];
  }

  acceptDonation(donation: TransferringDonation) {
    donation.status = 'Accepted';
  }
  rejectDonation(donation: TransferringDonation) {
    donation.status = 'Rejected';
  }
  showDonationDetails(donation: TransferringDonation) {
    this.dialog.open(DetailTransferComponent, {
      width: '400px', // Adjust the width as needed
      data: donation
    });
  }
}