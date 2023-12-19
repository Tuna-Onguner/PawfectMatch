// blogger-applications.component.ts
import { Component, OnInit } from '@angular/core';
import { blogApplications } from '../../../models/applications-models'; // Adjust the path based on your project structure
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
})
export class BloggerApplicationsComponent implements OnInit {
  blogs: blogApplications[] = []; // Initialize an empty array
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // Fetch blog data (replace this with your actual logic)
    this.blogs = this.getMockBlogs();
  }

  showBlogDetails(blog: blogApplications) {
    this.dialog.open(DetailBlogApplicationsComponent, {
    data: blog,
    });
  }
  applyApplication(blog: blogApplications) {
    blog.status = 'Approved';
  }
  rejectApplication(blog: blogApplications) {
      blog.status = 'Rejected';
  }
  private getMockBlogs(): blogApplications[] {
    // Mock data for demonstration purposes
    return [
      {
        id: 1,
        title: 'Blog Title 1',
        type: 'Type A',
        createdAt: new Date('2023-01-01'),
        userID: 101,
        status: 'Pending',
        motivation: 'Motivation for Blog 1',
        userEmail: 'user1@example.com',
        userName: 'User One',
        userPhoneNumber: '123-456-7890',
        motivationFile: {
          fileName: 'motivation_file_1.txt',
          filePath: '/path/to/motivation_file_1.txt',
          fileSize: 1024 // File size in bytes
        }
      },
      {
        id: 2,
        title: 'Blog Title 2',
        type: 'Type B',
        createdAt: new Date('2023-02-15'),
        userID: 102,
        status: 'Approved',
        motivation: 'Motivation for Blog 2',
        userEmail: 'user2@example.com',
        userName: 'User Two',
        userPhoneNumber: '987-654-3210',
        motivationFile: {
          fileName: 'motivation_file_2.doc',
          filePath: '/path/to/motivation_file_2.doc',
          fileSize: 2048 // File size in bytes
        }
      },
      {
        id: 3,
        title: 'Blog Title 3',
        type: 'Type C',
        createdAt: new Date('2023-03-20'),
        userID: 103,
        status: 'Rejected',
        motivation: 'Motivation for Blog 3',
        userEmail: 'user3@example.com',
        userName: 'User Three',
        userPhoneNumber: '555-123-4567',
        motivationFile: {
          fileName: 'motivation_file_3.pdf',
          filePath: '/path/to/motivation_file_3.pdf',
          fileSize: 3072 // File size in bytes
        }
      },
      // Add more mock blogs as needed
    ];
  }  
}
