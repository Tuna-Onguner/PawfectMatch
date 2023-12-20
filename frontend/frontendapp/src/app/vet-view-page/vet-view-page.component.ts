import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Veterinarian} from "../../../__models/user_models";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import * as faker from 'faker';
import {MatButtonModule} from "@angular/material/button";
@Component({
  selector: 'app-vet-view-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './vet-view-page.component.html',
  styleUrl: './vet-view-page.component.css'
})
export class VetViewPageComponent implements OnInit{
  displayedColumns: string[] = ['userName', 'phoneNumber', 'email', 'vetStreet', 'vetCountry', 'vetCity', 'vetState', 'reserve'];
  veterinarians: Veterinarian[] = [];
  dataSource: MatTableDataSource<Veterinarian> = new MatTableDataSource<Veterinarian>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.veterinarians = this.generateVets();
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.veterinarians);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  generateVets(): Veterinarian[] {
    const vets: Veterinarian[] = [];
    for (let i = 0; i < 30; i++) {
      vets.push({
        userId: i + 1,
        userName: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        vetId: i + 1,
        vetStreet: faker.address.streetAddress(),
        vetCountry: faker.address.country(),
        vetCity: faker.address.city(),
        vetState: faker.address.state()
      });
    }

    return vets;
  }

  onReserve(vet: Veterinarian) {
  console.log(`Reserve button clicked for vet: ${vet.userName}`);
  // Implement your reservation logic here...
}
}
