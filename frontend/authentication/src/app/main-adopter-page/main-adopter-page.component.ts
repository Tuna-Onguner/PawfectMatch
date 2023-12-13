import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RegisterPetDialogComponent} from "../register-pet-dialog/register-pet-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-main-adopter-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    MatSidenavModule,
    RouterOutlet
  ],
  templateUrl: './main-adopter-page.component.html',
  styleUrl: './main-adopter-page.component.css'
})
export class MainAdopterPageComponent {

  /*
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterPetDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        petSizes: ['Large', 'Medium', 'Small'],
        petTypes: ['Dog', 'Cat', 'Other'],
        petBreeds: ['Breed1', 'Breed2', 'Breed3']}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSnackBar() {
    this.snackBar.open('Pet registered successfully', 'Close', {
      duration: 2000,
    });
  }

  protected readonly RegisterPetDialogComponent = RegisterPetDialogComponent;
  */
}
