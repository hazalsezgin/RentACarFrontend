import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ToastrModule} from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './components/car/cars.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';

import { RentalComponent } from './components/rental/rental.component';
import { ColorComponent } from './components/color/color.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarImageAddComponent } from './components/car-image-add/car-image-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { HomeComponent } from './components/home/home.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { ListCarComponent } from './components/list-car/list-car.component';
import { FooterComponent } from './components/footer/footer.component';
import { UeditComponent } from './components/uedit/uedit.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    BrandComponent,
    NaviComponent,
    ColorComponent,
    RentalComponent,
    FilterPipePipe,
    VatAddedPipe,
    ColorFilterPipe,
    SidebarComponent,
    PaymentComponent,
    CreditCardComponent,
    LoginComponent,
    RegisterComponent,
    CarImageAddComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    AddCarComponent,
    AddColorComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    HomeComponent,
    CarDetailsComponent,
    ListCarComponent,
    FooterComponent,
    UeditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
