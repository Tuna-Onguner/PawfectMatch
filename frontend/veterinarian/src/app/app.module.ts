import { RouterModule } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    // other components
    MainScreenComponent
  ],
  imports: [
    // other modules
    RouterModule, // add this
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }