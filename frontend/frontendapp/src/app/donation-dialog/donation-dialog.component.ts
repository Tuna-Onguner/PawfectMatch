import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import * as faker from 'faker';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AdoptionOrganizationServices} from "../../services/adoption-organization-services";
import { DonationServices } from '../../services/donation-services';
import { Router } from '@angular/router';

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
  providers: [AdoptionOrganizationServices, DonationServices],
  templateUrl: './donation-dialog.component.html',
  styleUrl: './donation-dialog.component.css'
})
export class DonationDialogComponent {
  form: FormGroup;
  organizations: any = [];

  constructor(private adoptionOrganizationServices: AdoptionOrganizationServices, private donationServices: DonationServices,
              private router: Router) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
      organization: new FormControl('', Validators.required)
    });

    this.getOrganizations();
  }

  onSubmit() {
    if (this.form.valid) {
      const amountControl = this.form.get('amount');
      const organizationControl = this.form.get('organization');

      const amount = amountControl ? amountControl.value : null;
      const organization = organizationControl ? organizationControl.value : null;

      console.log(organization)
      this.donationServices.makeDonation(amount, organization).subscribe(
        (data) => {
          if (data.status === 201) {
            alert("Donation successful!");
            //Refresh the page
            window.location.reload();    
          }
          else {
            alert("Donation failed!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getOrganizations() {
    //Get the list of organizations
    this.adoptionOrganizationServices.getOrganizations().subscribe(
      //Map the ao_name and ao_id to the organizations array
      (data) => {
        //Put all organiztions as arrays with name and id
        this.organizations = data.body.map((organization : any) => ({
          name: organization.ao_name,
          id: organization.ao_id
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
