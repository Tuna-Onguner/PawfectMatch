import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { DetailOverseeComponent } from '../detail-oversee/detail-oversee.component'; // Import the dialog component
import { Oversee } from '../../../models/pet-models'; // Import the Oversee interface
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-request-oversee',
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
  templateUrl: './request-oversee.component.html',
  styleUrls: ['./request-oversee.component.css']
})
export class RequestOverseeComponent {
  previousOversees: Oversee[] = [
    // Sample data for demonstration
    {
      id: 1,
      veterinarianId: 101,
      name: 'Buddy',
      age: 3,
      type: 'Dog',
      breed: 'Labrador Retriever',
      color: 'Golden',
      weight: 30,
      height: 24,
      description: 'Friendly and energetic',
      image: 'path/to/buddy-image.jpg',
      organizationId: 201,
      organizationName: 'Pawfect Vet Clinic',
      feedback: 'Good health condition',
    },
    // Add more oversees as needed
  ];

  constructor(private dialog: MatDialog) {}

  openDialog(oversee: Oversee): void {
    this.dialog.open(DetailOverseeComponent, {
      width: '400px', // Adjust the width as needed
      data: oversee,
    });
  }

  applyForOversee() {
    // Implement the method for applying for a new oversee
  }

  petType: string | undefined;
  reason: string | undefined;
  applicationDate: Date | undefined;
}
