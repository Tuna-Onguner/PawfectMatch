import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import {NgForOf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {Donation} from "../../../__models/functional_models";
import {MatTableModule} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UpdateCardNumberComponent} from "../update-card-number/update-card-number.component";
import {DonationDialogComponent} from "../donation-dialog/donation-dialog.component";
import { DonationServices } from '../../services/donation-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatListModule,
    MatLineModule,
    NgForOf,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [DonationServices],
  templateUrl: './donation-page.component.html',
  styleUrl: './donation-page.component.css'
})
export class DonationPageComponent {
  donations: Donation[] = [];
  statistics: any;
  displayedColumns: string[] = ['donationId', 'donationAmount', 'donationDate', 'donationStatus'];
  
  constructor(public dialog: MatDialog, private donationServices: DonationServices, private rooter: Router) { }
  ngOnInit() {
    //Check the token
    const token = localStorage.getItem('token');
    console.log(token);
    if (token === null) {
      this.rooter.navigateByUrl('/login');
    }
    this.donationServices.getDonations().subscribe(
      (data) => {
        this.donations = data.body.map((donation : any) => ({
            donationId: donation.donation_id,
            donationAmount: donation.amount,
            donationDate: donation.ddate,
            donationStatus: "Completed"
          }));
      },
      (error) => {
        console.log(error);
      }
    );
    this.donationServices.getDonationStatistics().subscribe(
      (data) => {
        this.statistics = data.body;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  openUpdateCardDialog() {
  this.dialog.open(UpdateCardNumberComponent);
}

  openDonationDialog() {
    this.dialog.open(DonationDialogComponent);
  }
}