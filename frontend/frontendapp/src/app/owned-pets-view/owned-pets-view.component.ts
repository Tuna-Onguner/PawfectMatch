import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Pet} from "../../../__models/functional_models";
import {MatButtonModule} from "@angular/material/button";
import { PetServices } from '../../services/pet-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owned-pets-view',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './owned-pets-view.component.html',
  styleUrl: './owned-pets-view.component.css',
  providers: [PetServices]
})
export class OwnedPetsViewComponent {

  displayedColumns: string[] = ['petName', 'petSize', 'petColor', 'petImage', 'delete'];
  dataSource: MatTableDataSource<Pet> = new MatTableDataSource<Pet>();

  constructor(private petServices: PetServices, private router: Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.petServices.getOwnedPets().subscribe((petsData: any) => {
      console.log(petsData);
      this.dataSource.data = petsData.body.map((pet: any) => ({
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deletePet(pet: Pet) {
    this.petServices.deletePets(pet.petId).subscribe(
      (response: any) => {
          console.log(response);
          // Call a method to refresh data or perform necessary logic
          this.refreshData();
      },
      error => {
          console.error('Error:', error);
      }
  );
  }

  private refreshData() {
    this.petServices.getOwnedPets().subscribe((petsData: any) => {
      console.log(petsData);
      this.dataSource.data = petsData.body.map((pet: any) => ({
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
}
