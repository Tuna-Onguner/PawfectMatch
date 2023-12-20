import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {FormGroup, FormsModule} from '@angular/forms';
import { DetailOverseeComponent } from '../detail-oversee/detail-oversee.component'; // Import the dialog component
import { OverseeingReq } from '../../../__models/application_models'; // Import the Oversee interface
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import faker from "faker";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
    ],
  templateUrl: './request-oversee.component.html',
  styleUrls: ['./request-oversee.component.css']
})
export class RequestOverseeComponent {
  previousOversees: OverseeingReq[] = [];
  oversee_app: FormGroup;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.oversee_app = this.fb.group({
      reason: ['', Validators.required],
      applicationDate: ['', Validators.required]
    });
  }

  applyForOversee() {
    if (this.oversee_app.valid) {
      // Implement the method for applying for a new oversee
    }
  }

  openDialog(oversee: OverseeingReq): void {
    this.dialog.open(DetailOverseeComponent, {
      width: '400px', // Adjust the width as needed
      data: oversee,
    });
  }

  generateOversees(): void {
  let previousOversees: OverseeingReq[] = [];
  for(let i = 0; i < 30; i++) {
    previousOversees.push(<OverseeingReq>{
      aoId: faker.datatype.number({min: 1, max: 100}),
      aoName: faker.company.companyName(),
      adopterId: faker.datatype.number({min: 1, max: 100}),
      adopterName: faker.name.findName(),
      oreqDate: faker.date.past(),
      oreqStatus: faker.random.word(),
      oreqResponseDate: faker.date.past(),
      omotivationText: faker.lorem.paragraph(),
      oreqResult: faker.random.word(),
    });
  }
  this.previousOversees = previousOversees;
}

}
