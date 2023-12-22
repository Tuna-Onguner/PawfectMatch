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
import { AdoptionApp } from "../../../__models/application_models" // Replace with the correct path
import { DetailAdoptionApplicationComponent } from '../detail-adoption-application/detail-adoption-application.component'; // Import the detail component
import { AdoptionApplicationServices } from '../../services/adoption-application-services';
@Component({
  selector: 'app-adoption-applications',
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
  providers: [AdoptionApplicationServices],
  templateUrl: './adoption-applications.component.html',
  styleUrl: './adoption-applications.component.css'
})
export class AdoptionApplicationsComponent implements OnInit {
  adoptionApplications: AdoptionApp[] = [];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private adoptionApplicationServices: AdoptionApplicationServices) {}

  ngOnInit() {
    // In a real application, you would fetch adoption applications data from a service
    // For now, we'll mock some data for demonstration purposes
    this.adoptionApplications = this.getApplications();
    
  }

  showDetails(application: AdoptionApp) {
    this.dialog.open(DetailAdoptionApplicationComponent, {
      data: application,
    });
  }

  acceptApplication(application: AdoptionApp) {
    application.aapp_status = 'Accepted';
    
  }

  rejectApplication(application: AdoptionApp) {
    application.aapp_status = 'Rejected';
  }

  private getApplications(): AdoptionApp[] {
    //Fetch applications from the backend
    this.adoptionApplicationServices.getApplications().subscribe(
      (data) => {
        /*
          Here is the data coming from backend
          [
            {
                "adopter_id": 2,
                "aapp_date": "2023-12-22T10:55:26",
                "pet_id": 1,
                "aapp_file": null,
                "aapp_status": "PENDING",
                "aapp_response_date": null,
                "amotivation_text": null
            }
        ]
        */
        //Assign the data by mapping to an array
        this.adoptionApplications = data.body.map((item: any) => {
          return {
            adopter_id: item.adopter_id,
            ao_id: item.ao_id,
            aapp_date: item.aapp_date,
            pet_id: item.pet_id,
            petName: item.pet_name,
            aapp_file: item.aapp_file,
            aapp_status: item.aapp_status,
            aapp_response_date: item.aapp_response_date,
            amotivation_text: item.amotivation_text,
          };
        });
      },
      (err) => {
        console.log(err);
      }
    );
    return [];
  }
}