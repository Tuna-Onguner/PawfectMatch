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
import { expertApplications } from '../../../models/applications-models';
import { DetailExpertApplicationsComponent } from '../detail-expert-applications/detail-expert-applications.component';

@Component({
  selector: 'app-expert-applications',
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
  templateUrl: './expert-applications.component.html',
  styleUrl: './expert-applications.component.css'
})
export class ExpertApplicationsComponent implements OnInit {
  expertApplications: expertApplications[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // This method is called when the component is initialized.
    // You can use it to fetch data or perform any other setup.

    // For now, let's fetch mock expert application data.
    this.expertApplications = this.getMockExpertApplications();
  }
  showApplicationDetails(expert: expertApplications) {
    this.dialog.open(DetailExpertApplicationsComponent, {
    data: expert,
    });
  }
  applyApplication(expert: expertApplications) {
    expert.status = 'Approved';
  }
  rejectApplication(expert: expertApplications) {
    expert.status = 'Rejected';
  }
  private getMockExpertApplications(): expertApplications[] {
    // Mock data for demonstration purposes
    return [
      {
        id: 1,
        title: 'Expert Application 1',
        type: 'Type X',
        createdAt: new Date('2023-04-01'),
        userID: 201,
        status: 'Pending',
        motivation: 'Motivation for Expert Application 1',
        userEmail: 'expert1@example.com',
        userName: 'Expert One',
        userPhoneNumber: '111-222-3333',
        motivationFile: {
          fileName: 'motivation_file_expert_1.txt',
          filePath: '/path/to/motivation_file_expert_1.txt',
          fileSize: 1024, // File size in bytes
        },
      },
      {
        id: 2,
        title: 'Expert Application 2',
        type: 'Type Y',
        createdAt: new Date('2023-04-15'),
        userID: 202,
        status: 'Approved',
        motivation: 'Motivation for Expert Application 2',
        userEmail: 'expert2@example.com',
        userName: 'Expert Two',
        userPhoneNumber: '444-555-6666',
        motivationFile: {
          fileName: 'motivation_file_expert_2.doc',
          filePath: '/path/to/motivation_file_expert_2.doc',
          fileSize: 2048, // File size in bytes
        },
      },
      // Add more mock expert applications as needed
    ];
  }
}

