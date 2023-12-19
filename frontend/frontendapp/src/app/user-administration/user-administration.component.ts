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
import { User } from '../../../models/user-models'; // Add this line
import { DetailUserComponent } from '../detail-user/detail-user.component';

@Component({
  selector: 'app-user-administration',
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
  templateUrl: './user-administration.component.html',
  styleUrl: './user-administration.component.css'
})
export class UserAdministrationComponent {
  users: User[] = []; // Add this line

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    // ... existing ngOnInit code

    // Example of fetching user data (replace this with your actual logic)
    this.users = this.getMockUsers();
  }

  // ... existing methods

  private getMockUsers(): User[] {
    // This method provides mock user data for demonstration purposes
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'Admin',
        createdAt: new Date('2023-01-01'),
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'pass456',
        role: 'User',
        createdAt: new Date('2023-02-01'),
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        password: 'securePass',
        role: 'User',
        createdAt: new Date('2023-03-01'),
      },
      {
        id: 4,
        name: 'Alice Williams',
        email: 'alice.williams@example.com',
        password: 'myPassword',
        role: 'Admin',
        createdAt: new Date('2023-04-01'),
      },
      {
        id: 5,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: 'charliePass',
        role: 'User',
        createdAt: new Date('2023-05-01'),
      },
      {
        id: 6,
        name: 'Eva Davis',
        email: 'eva.davis@example.com',
        password: 'evaPassword',
        role: 'Admin',
        createdAt: new Date('2023-06-01'),
      },
      {
        id: 7,
        name: 'Michael Clark',
        email: 'michael.clark@example.com',
        password: 'mike123',
        role: 'User',
        createdAt: new Date('2023-07-01'),
      },
      {
        id: 8,
        name: 'Olivia Taylor',
        email: 'olivia.taylor@example.com',
        password: 'oliviaPass',
        role: 'User',
        createdAt: new Date('2023-08-01'),
      },
      {
        id: 9,
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        password: 'wilsonPass',
        role: 'Admin',
        createdAt: new Date('2023-09-01'),
      },
      {
        id: 10,
        name: 'Sophia Turner',
        email: 'sophia.turner@example.com',
        password: 'sophia123',
        role: 'User',
        createdAt: new Date('2023-10-01'),
      },
      // Add more mock users as needed
    ];
  }
  
  showUserDetails(user: User) {
    this.dialog.open(DetailUserComponent, {
      data: user  // Pass the agreement directly without the extra 'data' property
    });
  }
  removeUser(user: User) {
    // Find the index of the user in the array
    const index = this.users.findIndex(u => u.id === user.id);

    if (index !== -1) {
      // Remove the user from the array
      this.users.splice(index, 1);

      // Optionally, you can show a snackbar or perform any other actions
      this.snackBar.open('User removed successfully', 'Close', {
        duration: 2000,
      });
    } else {
      console.error('User not found in the array');
    }
  }
}
