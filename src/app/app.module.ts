import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateComponent } from './container/date/date.component';
import { IsOpenComponent } from './container/is-open/is-open.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminForFortuneGardenComponent } from './container/admin-for-fortune-garden/admin-for-fortune-garden.component';
import { ContainerComponent } from './container/container.component';
import { SignatureComponent } from './signature/signature.component';
import { DogPoopForecastComponent } from './dog-poop-forecast/dog-poop-forecast.component';


@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    IsOpenComponent,
    AdminForFortuneGardenComponent,
    ContainerComponent,
    SignatureComponent,
    DogPoopForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
