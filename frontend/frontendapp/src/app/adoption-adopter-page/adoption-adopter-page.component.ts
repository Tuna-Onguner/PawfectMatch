import { Component } from '@angular/core';
import {Blog, Pet} from '../../../__models/functional_models';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {BlogDialogComponent} from "../blog-dialog/blog-dialog.component";
import {AdoptDialogComponent} from "../adopt-dialog/adopt-dialog.component";
import { PetServices } from '../../services/pet-services';
import { Router } from '@angular/router';


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
  styleUrl: './adoption-adopter-page.component.css',
  providers: [PetServices]

})
export class AdoptionAdopterPageComponent {
  pets: Pet[] = []; // Replace with actual data
  pageIndex: number = 0;
  pageSize: number = 8;

  constructor(private dialog: MatDialog, private petServices: PetServices, private router: Router) { }
  
  openDialog(pet: Pet): void {
  this.dialog.open(AdoptDialogComponent, {
    data: { pet: pet}
  });
  }

  ngOnInit(): void {
    this.petServices.getPets().subscribe(petsData => {
      this.pets = petsData.body.map((pet: any) => ({
        petId: pet.pet_id,
        petName: pet.pet_name,
        petSize: pet.pet_size,
        petImage: pet.pet_image,
        petColor: pet.pet_color,
        isAdopted: pet.is_adopted === 1,
        adopterId: pet.adopter_id,
        aoId: pet.ao_id,
        petBreedId: pet.pet_breed_id
      }));
    }, error => {
      console.error('Error:', error);
    });
  }

  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
