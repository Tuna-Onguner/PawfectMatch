import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import * as faker from "faker";
import {MatButtonModule} from "@angular/material/button";

class Oversight {
}

@Component({
  selector: 'app-overseeing-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  templateUrl: './overseeing-page.component.html',
  styleUrl: './overseeing-page.component.css'
})
export class OverseeingPageComponent {
  displayedColumns: string[] = ['organizationName', 'motivationScript', 'status', 'actions'];
  dataSource: MatTableDataSource<Oversight> = new MatTableDataSource<Oversight>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.data = this.getOversights();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getOversights(): Oversight[] {
    const oversights: Oversight[] = [];

    for (let i = 0; i < 30; i++) {
      oversights.push(<Oversight>{
        organizationName: faker.company.companyName(),
        motivationScript: faker.lorem.paragraph(10),
        status: faker.random.arrayElement(['Accepted', 'Rejected', 'Pending'])
      });
    }

    return oversights;
  }
}
