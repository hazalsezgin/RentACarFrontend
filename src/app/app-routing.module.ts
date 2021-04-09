import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarImageAddComponent } from './components/car-image-add/car-image-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarsComponent } from './components/car/cars.component';
import { ColorComponent } from './components/color/color.component';
import { HomeComponent } from './components/home/home.component';
import { ListCarComponent } from './components/list-car/list-car.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UeditComponent } from './components/uedit/uedit.component';
import { RentalService } from './services/rental.service';

const routes: Routes = [
  {path:"",pathMatch:"full", component:HomeComponent},
  {path:"cars",component:CarsComponent},
  {path:"cars/brand/:brandId",component:CarsComponent},
  {path:"cars/color/:colorId",component:CarsComponent},
  {path:"cars/details/:carId", component:CarDetailsComponent},
  {path:"brands", component:BrandComponent},
  {path:"colors", component:ColorComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarsComponent},
  {path:"payment",component:PaymentComponent},
  {path:"car/add",component:AddCarComponent},
  {path:"color/add",component:AddColorComponent},
  {path:"brand/add",component:BrandAddComponent},
  {path:"rentals",component:RentalComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"list",component:ListCarComponent},
  {path:"car/update/:id",component:CarUpdateComponent},
  {path:"car/addimage/:id",component:CarImageAddComponent},
  {path:"home",component:HomeComponent},
  {path:"edit/user",component:UeditComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
