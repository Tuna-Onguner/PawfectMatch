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
import {Router} from "@angular/router";

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
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigateByUrl('/main-adopter-page/adopter-adoption-page');
  }
}
