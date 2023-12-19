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
import {MatGridListModule} from "@angular/material/grid-list";
import {Pet} from "../../../models/pet-models";
import {DetailPetComponent} from "../detail-pet/detail-pet.component";


@Component({
  selector: 'app-home',
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
    MatGridListModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  petExamples: Pet[] = [];
  constructor(public dialog: MatDialog) {}

  openPetDialog(pet: Pet): void {
    this.dialog.open(DetailPetComponent, {
      data: pet,
      width: '400px' // Adjust the width as needed
    });
  }

  ngOnInit() {
    this.generatePetExamples();
  }

  generatePetExamples() {
    for (let i = 1; i <= 6; i++) {
      const pet: Pet = {
        id: i,
        name: `Pet${i}`,
        age: Math.floor(Math.random() * 5) + 1, // Random age between 1 and 5
        type: 'Dog', // You can customize this based on your types
        breed: `Breed${i}`,
        color: 'Brown', // You can customize this based on your colors
        weight: Math.floor(Math.random() * 10) + 5, // Random weight between 5 and 15
        height: Math.floor(Math.random() * 20) + 10, // Random height between 10 and 30
        description: `Description for Pet${i}`,
        image: `path/to/image${i}.jpg`, // You should have images with corresponding names
        organizationId: i,
        organizationName: `Org${i}`
      };

      this.petExamples.push(pet);
    }
  }
}