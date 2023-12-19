import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Reservation, Slot} from "../../../__models/functional_models";
import * as faker from 'faker';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
@Component({
  selector: 'app-reservations-view',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './reservations-view.component.html',
  styleUrl: './reservations-view.component.css'
})
export class ReservationsViewComponent {

  displayedColumns: string[] = ['rvDate', 'rvStatus', 'rvResponseDate', 'earliestSlotDate', 'latestSlotDate', 'numSlots'];
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource.data = this.getReservations(); // Replace with your actual logic to fetch the reservations
  }

  getReservations(): Reservation[] {
  const reservations: Reservation[] = [];

  for (let i = 0; i < 30; i++) {
    const slots: Slot[] = [];
    const numSlots = Math.floor(Math.random() * 5) + 1; // Generate a random number between 1 and 5

    for (let j = 0; j < numSlots; j++) {
      slots.push(<Slot>{
        startHour: faker.date.recent(),
        endHour: faker.date.recent(),
        // Add other properties as needed...
      });
    }

    reservations.push(<Reservation>{
      rvDate: faker.date.past(),
      rvStatus: faker.random.arrayElement(['Accepted', 'Rejected', 'Pending']),
      rvResponseDate: faker.date.recent(),
      slots: slots
    });
  }

  return reservations;
}

getEarliestSlotDate(slots: Slot[]): Date {
    return slots.reduce((earliest, slot) => slot.startHour < earliest ? slot.startHour : earliest, slots[0].startHour);
  }

  getLatestSlotDate(slots: Slot[]): Date {
    return slots.reduce((latest, slot) => slot.endHour > latest ? slot.endHour : latest, slots[0].endHour);
  }
}
