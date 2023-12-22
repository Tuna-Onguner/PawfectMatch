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
import {Pet} from "../../../__models/functional_models"
import {DetailPetComponent} from "../detail-pet/detail-pet.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { AuthenticationService } from '../../services/authentication-services';
import {Router} from '@angular/router';
import {PetServices} from "../../services/pet-services";

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
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [AuthenticationService, PetServices],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  petExamples: Pet[] = [];

  constructor(public dialog: MatDialog, private authService: AuthenticationService, private router: Router, private petServices: PetServices) {}

  openPetDialog(pet: Pet): void {
    this.dialog.open(DetailPetComponent, {
      data: pet,
      width: '400px', // Adjust the width as needed
    });
  }

  ngOnInit() {
    this.getOwnedPets();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      // Navigate to login page after successful logout
      this.router.navigate(['/login']);
    });
  }

  getOwnedPets() {
    this.petServices.getOwnedPets().subscribe(
      (data) => {
        //Now map the data
        this.petExamples = data.body.map((pet: any) => ({
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

      },
      (error) => {
        console.log(error);
      }
    );
  }
}
