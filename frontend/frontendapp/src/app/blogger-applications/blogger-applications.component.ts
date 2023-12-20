// blogger-applications.component.ts
import { Component, OnInit } from '@angular/core';
import { BloggerApp } from '../../../__models/application_models'; // Adjust the path based on your project structure
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { DetailBlogApplicationsComponent } from '../detail-blog-applications/detail-blog-applications.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import { MatListModule } from '@angular/material/list'; // Add this line for MatListModule




@Component({
  selector: 'app-blogger-applications',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule, // Add this line to import MatMenuModule
    RouterLink,
    MatSidenavModule,
    RouterOutlet,
    MatListModule,
    MatCardModule,
  ],
  templateUrl: './blogger-applications.component.html',
  styleUrls: ['./blogger-applications.component.css']
})export class BloggerApplicationsComponent implements OnInit {
  blogs: BloggerApp[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // Fetch blog data (replace this with your actual logic)
    this.blogs = this.getMockBlogs();
  }

  showBlogDetails(blog: BloggerApp) {
    this.dialog.open(DetailBlogApplicationsComponent, {
      data: blog,
    });
  }

  applyApplication(blog: BloggerApp) {
    blog.bappStatus = 'Approved';
  }

  rejectApplication(blog: BloggerApp) {
    blog.bappStatus = 'Rejected';
  }

  private getMockBlogs(): BloggerApp[] {
    // Mock data for demonstration purposes
    return [
      {
        adopterId: 1,
        blogFieldId: 101,
        blogFieldName: 'Blog Type A',
        bappDate: new Date('2023-01-01'),
        bappFile: null,
        bappStatus: 'Pending',
        bappResponseDate: new Date(),
        bmotivationText: 'Motivation for Blog 1',
        badminId: 201
      },
      {
        adopterId: 2,
        blogFieldId: 102,
        blogFieldName: 'Blog Type B',
        bappDate: new Date('2023-02-15'),
        bappFile: null,
        bappStatus: 'Approved',
        bappResponseDate: new Date(),
        bmotivationText: 'Motivation for Blog 2',
        badminId: 202
      },
      {
        adopterId: 3,
        blogFieldId: 103,
        blogFieldName: 'Blog Type C',
        bappDate: new Date('2023-03-20'),
        bappFile: null,
        bappStatus: 'Rejected',
        bappResponseDate: new Date(),
        bmotivationText: 'Motivation for Blog 3',
        badminId: 203
      },
      // Add more mock blogs as needed
    ];
  }
}
