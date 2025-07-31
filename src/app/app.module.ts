import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
// Angular Material
import { MaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MeanService } from './services/mean.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddModalComponent } from './components/actions/add-modal/add-modal.component';
import { EditModalComponent } from './components/actions/edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AddModalComponent,
    EditModalComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MeanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
