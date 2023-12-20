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
import { DonationReception } from '../../../__models/functional_models';
import { DetailTransferComponent } from '../detail-transfer/detail-transfer.component';
import * as faker from 'faker';
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
  transferringDonations: DonationReception[] = []; // Assuming you have a data source

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch or initialize your transferring donations data
    this.transferringDonations = this.generateRandomDonationReceptions();
  }


  generateRandomDonationReceptions(): DonationReception[] {
    let randomDonationReceptions: DonationReception[] = [];
    for(let i = 0; i < 10; i++) {
        let donationReception: DonationReception = {
            donationId: faker.datatype.number({ min: 1, max: 100 }),
            adopterId: faker.datatype.number({ min: 1, max: 100 }),
            aoName: faker.company.companyName(),
            adopterName: faker.name.findName(),
            donationStatus: faker.random.arrayElement(['Accepted', 'Rejected', 'Pending']),
            receptionDate: faker.date.past(),
            receivedAmount: faker.datatype.number({ min: 1, max: 10000 }),
            adminId: faker.datatype.number({ min: 1, max: 100 }),
        };

        randomDonationReceptions.push(donationReception);
    }
    return randomDonationReceptions;
}
  acceptDonation(donation: DonationReception) {
    donation.donationStatus = 'Accepted';
  }
  rejectDonation(donation: DonationReception) {
    donation.donationStatus = 'Rejected';
  }
  showDonationDetails(donation: DonationReception) {
    this.dialog.open(DetailTransferComponent, {
      width: '400px', // Adjust the width as needed
      data: donation
    });
  }
}
