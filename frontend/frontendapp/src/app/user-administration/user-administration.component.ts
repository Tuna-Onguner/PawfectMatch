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
import { User } from '../../../__models/user_models'; // Add this line
import { DetailUserComponent } from '../detail-user/detail-user.component';
import * as faker from 'faker';
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
  role: string;
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.role = "";
  }

  ngOnInit() {
    // ... existing ngOnInit code

    // Example of fetching user data (replace this with your actual logic)
    this.users = this.getMockUsers();
  }

  // ... existing methods

  private getMockUsers(): User[] {
    // This method provides mock user data for demonstration purposes
    let randomUsers: User[] = [];
    for(let i = 0; i < 10; i++) {
        let user: User = {
            userId: faker.datatype.number({ min: 1, max: 100 }),
            userName: faker.name.findName(),
            phoneNumber: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        randomUsers.push(user);
    }
    return randomUsers;
  }

  showUserDetails(user: User) {
    this.dialog.open(DetailUserComponent, {
      data: user  // Pass the agreement directly without the extra 'data' property
    });
  }
  removeUser(user: User) {
    // Find the index of the user in the array
    const index = this.users.findIndex(u => u.userId === user.userId);

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
