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
import { FireworksComponent } from './fireworks/fireworks.component';
import { McdonaldsComponent } from './mcdonalds/mcdonalds.component';
import { NightModeComponent } from './night-mode/night-mode.component';
import { SuggestionsPageComponent } from './suggestions-page/suggestions-page.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { KwikStarComponent } from './kwik-star/kwik-star.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { OneFourtyOneComponent } from './one-fourty-one/one-fourty-one.component';


@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    IsOpenComponent,
    AdminForFortuneGardenComponent,
    ContainerComponent,
    SignatureComponent,
    DogPoopForecastComponent,
    FireworksComponent,
    McdonaldsComponent,
    NightModeComponent,
    SuggestionsPageComponent,
    KwikStarComponent,
    ImageUploaderComponent,
    OneFourtyOneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
