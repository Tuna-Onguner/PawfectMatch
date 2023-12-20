import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgreementReq } from '../../../__models/application_models';
import { FormsModule } from '@angular/forms';
import { DetailVetAgreementComponent } from '../detail-vet-agreement/detail-vet-agreement.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


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
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './find-veterinarians.component.html',
  styleUrls: ['./find-veterinarians.component.css']
})
export class FindVeterinariansComponent implements OnInit {
  agreements: AgreementReq[] = [];
  newAgreement: AgreementReq = {
    file: null,
    aoId: 0,
    vetId: 0,
    agreqDate: new Date(),
    requesterId: 0,
    aqreqStatus: '',
    agreqResponseDate: null,
    agMotivationText: '',
    agreqTermDate: new Date(),
  };

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // Fetch or set your agreements data here
    this.agreements = [
      {
        file: null,
        aoId: 1,
        vetId: 456,
        agreqDate: new Date(),
        requesterId: 789,
        aqreqStatus: 'Pending',
        agreqResponseDate: new Date(),
        agMotivationText: 'Sample motivation text',
        agreqTermDate: new Date(),
      },
      // Add more agreements as needed
    ];
  }

  showAgreementDetails(agreement: AgreementReq) {
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
      file: null,
      aoId: 0,
      vetId: 0,
      agreqDate: new Date(),
      requesterId: 0,
      aqreqStatus: '',
      agreqResponseDate: null,
      agMotivationText: '',
      agreqTermDate: new Date(),
    };
  }

  handleFileInput(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.newAgreement.file = fileList[0];
    }
  }
}

