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
import { AgreementReq } from '../../../__models/application_models';
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
  agreements: AgreementReq[] = []; // Populate this array with your data

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // In a real application, you would fetch agreements data from a service
    // For now, we'll mock some data for demonstration purposes
    this.agreements = this.getMockAgreements();
  }

  showDetails(agreement: AgreementReq) {
    this.dialog.open(DetailAgreementsComponent, {
      data: agreement  // Pass the agreement directly without the extra 'data' property
    });
  }
  
  applyAgreement(agreement: AgreementReq) {
    agreement.aqreqStatus = 'Accepted';
  }

  rejectAgreement(agreement: AgreementReq) { 
    agreement.aqreqStatus = 'Rejected';
  }

  private getMockAgreements(): AgreementReq[] {
    // This method provides mock data for demonstration purposes
    return [
      {
        file: null, // Update this with appropriate values
        aoId: 1,
        vetId: 1,
        agreqDate: new Date('2023-01-01'),
        requesterId: 1,
        aqreqStatus: 'Accepted',
        agreqResponseDate: new Date('2023-01-02'),
        agMotivationText: 'Agreement motivation for Organization A',
        agreqTermDate: new Date('2023-12-31'),
      },
      {
        file: null, // Update this with appropriate values
        aoId: 2,
        vetId: 2,
        agreqDate: new Date('2023-02-01'),
        requesterId: 2,
        aqreqStatus: 'Pending',
        agreqResponseDate: null,
        agMotivationText: 'Agreement motivation for Organization B',
        agreqTermDate: new Date('2023-11-30'),
      },
      // Add more mock agreements as needed
    ];
  }
}