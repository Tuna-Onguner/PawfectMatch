// expert-applications.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpertApp } from '../../../__models/application_models';
import { DetailExpertApplicationsComponent } from '../detail-expert-applications/detail-expert-applications.component';

@Component({
  selector: 'app-expert-applications',
  templateUrl: './expert-applications.component.html',
  styleUrls: ['./expert-applications.component.css']
})
export class ExpertApplicationsComponent implements OnInit {
  expertApplications: ExpertApp[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // Fetch or set your expert applications data here
    this.expertApplications = this.getMockExpertApplications();
  }

  showApplicationDetails(expert: ExpertApp) {
    this.dialog.open(DetailExpertApplicationsComponent, {
      data: expert,
    });
  }

  applyApplication(expert: ExpertApp) {
    expert.eappStatus = 'Approved';
  }

  rejectApplication(expert: ExpertApp) {
    expert.eappStatus = 'Rejected';
  }

  private getMockExpertApplications(): ExpertApp[] {
    // Mock data for demonstration purposes
    return [
      {
        adopterId: 201,
        expertiseFieldId: 1,
        expertiseFieldName: 'Field X',
        eappDate: new Date('2023-04-01'),
        eappFile: new Blob([/* binary data */]),
        eappStatus: 'Pending',
        eappResponseDate: new Date('2023-04-10'),
        emotivationText: 'Motivation for Expert Application 1',
        eadminId: 301,
      },
      {
        adopterId: 202,
        expertiseFieldId: 2,
        expertiseFieldName: 'Field Y',
        eappDate: new Date('2023-04-15'),
        eappFile: new Blob([/* binary data */]),
        eappStatus: 'Approved',
        eappResponseDate: new Date('2023-04-20'),
        emotivationText: 'Motivation for Expert Application 2',
        eadminId: 302,
      },
      // Add more mock expert applications as needed
    ];
  }
}
