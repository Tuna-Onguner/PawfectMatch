import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pet } from '../../../__models/functional_models';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detail-pet',
  standalone: true,
  imports: [
    // Other modules
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './detail-pet.component.html',
  styleUrl: './detail-pet.component.css'
})
export class DetailPetComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pet) {}
}
