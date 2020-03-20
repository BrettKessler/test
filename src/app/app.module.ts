import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateComponent } from './container/date/date.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContainerComponent } from './container/container.component';
import { SignatureComponent } from './signature/signature.component';
import { SuggestionsPageComponent } from './suggestions-page/suggestions-page.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SuppliesComponent } from './supplies/supplies.component';


@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    ContainerComponent,
    SignatureComponent,
    SuggestionsPageComponent,
    SuppliesComponent
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
