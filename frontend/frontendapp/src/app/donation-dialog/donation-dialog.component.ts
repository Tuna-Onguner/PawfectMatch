import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import * as faker from 'faker';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
@Component({
  selector: 'app-donation-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './donation-dialog.component.html',
  styleUrl: './donation-dialog.component.css'
})
export class DonationDialogComponent {
  form: FormGroup;
  organizations: string[] = [];

  constructor() {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
      organization: new FormControl('', Validators.required)
    });

    this.generateOrganizations();
  }

  generateOrganizations() {
    for (let i = 0; i < 5; i++) {
      this.organizations.push(faker.company.companyName());
    }
  }
}
