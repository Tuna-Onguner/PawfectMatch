import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Pet} from "../../../__models/functional_models";
import * as faker from 'faker';
import {MatButtonModule} from "@angular/material/button";
@Component({
  selector: 'app-owned-pets-view',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './owned-pets-view.component.html',
  styleUrl: './owned-pets-view.component.css'
})
export class OwnedPetsViewComponent {

  displayedColumns: string[] = ['petName', 'petSize', 'petColor', 'petImage', 'delete'];
  pets: Pet[] = [];
  dataSource: MatTableDataSource<Pet> = new MatTableDataSource<Pet>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.pets = this.generatePets();
    this.dataSource = new MatTableDataSource(this.pets);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  generatePets(): Pet[] {
    const pets: Pet[] = [];
    for (let i = 0; i < 30; i++) {
      pets.push(<Pet>{
        petId: i + 1,
        petName: faker.name.firstName(),
        petSize: faker.random.arrayElement(['Small', 'Medium', 'Large']),
        petColor: faker.commerce.color(),
        petImage: 'assets/images/pet' + (Math.floor(Math.random() * 3) + 1) + '.JPG'
      });
    }
    return pets;
  }

  deletePet(pet: Pet) {

  }
}
