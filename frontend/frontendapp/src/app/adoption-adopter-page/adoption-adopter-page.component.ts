import { Component } from '@angular/core';
import {Blog, Pet} from '../../../__models/functional_models';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {BlogDialogComponent} from "../blog-dialog/blog-dialog.component";
import {AdoptDialogComponent} from "../adopt-dialog/adopt-dialog.component";

@Component({
  selector: 'app-adoption-adopter-page',
  standalone: true,
  imports: [
    MatGridListModule,
    MatPaginatorModule,
    NgForOf,
    NgOptimizedImage,
    MatButtonModule
  ],
  templateUrl: './adoption-adopter-page.component.html',
  styleUrl: './adoption-adopter-page.component.css'
})
export class AdoptionAdopterPageComponent {
  pets: Pet[] = []; // Replace with actual data
  pageIndex: number =0;
  pageSize: number = 8;

  constructor(private dialog: MatDialog) { }

// ...

  openDialog(pet: Pet): void {
  this.dialog.open(AdoptDialogComponent, {
    data: { pet: pet}
  });
}

  ngOnInit(): void {
    // Fetch the data of the pets and assign it to this.pets
    this.pets = this.generateRandomPets(4);
  }

  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  // Implement the logic for the filtering options and the paginator here
  generateRandomPets(numPets: number): Pet[] {
  const pets: Pet[] = [];
  const petSizes = ['Small', 'Medium', 'Large'];
  const petColors = ['Black', 'White', 'Brown', 'Gray', 'Mixed'];
  const petStatus = [true, false];

  for (let i = 0; i < numPets; i++) {
    const pet: {
      petName: string;
      adopterId: number;
      petId: number;
      aoId: number;
      isAdopted: boolean;
      petColor: string;
      petBreedId: number;
      petSize: string;
      petImage: string
    } = {
      petId: Math.floor(Math.random() * 1000),
      petName: 'Pet ' + Math.floor(Math.random() * 1000),
      petSize: petSizes[Math.floor(Math.random() * petSizes.length)],
      petImage: 'pet' + (Math.floor(Math.random() * 3) + 1) + '.JPG',
      petColor: petColors[Math.floor(Math.random() * petColors.length)],
      isAdopted: petStatus[Math.floor(Math.random() * petStatus.length)],
      adopterId: Math.floor(Math.random() * 100),
      aoId: Math.floor(Math.random() * 10),
      petBreedId: Math.floor(Math.random() * 50),
    };
    pets.push(<Pet>pet);
  }

  return pets;
}
}
