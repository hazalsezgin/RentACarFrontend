import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { DeleteCar } from 'src/app/models/deleteCar';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.css']
})
export class ListCarComponent implements OnInit {
  cars:Car[];
  currentCar:Car;
  brands:Brand[];
  currentBrand:Brand;
  colors:Color[];
  currentColor:Color;

  constructor(private carService:CarService, private brandService:BrandService, private colorService:ColorService,
    private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.getCars();
    this.getBrands();
    this.getColors();
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
    })
  }

  getCarClass(car:Car){

    if(car == this.currentCar){
      return "table-info cursorPointer"
    }else{
      return "cursorPointer"
    }
  }

  setCurrentCar(car:Car){
    this.currentCar=car;
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item cursorPointer active"
    }else{
      return "list-group-item cursorPointer "
    }
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  getColorClass(color:Color){
    if(color == this.currentColor){
      return "list-group-item cursorPointer active"
    }else{
      return "list-group-item cursorPointer "
    }
  }

  setCurrentColor(color:Color){
    this.currentColor=color;
  }

  deleteCar(car:Car){
    let carModel:DeleteCar={
      id:car.carId,
      brandId:car.brandId,
      colorId:car.colorId,
      modelYear:car.modelYear,
      dailyPrice:car.dailyPrice,
      description:car.description
    }
    this.carService.deleteCar(carModel).subscribe(response=>{
      this.toastr.success("Silindi")
      window.location.reload()
    },responseError=>{
      this.toastr.error("Silinemedi!")
    })
  }

  deleteBrand(brand:Brand){
    this.brandService.deleteBrand(brand).subscribe(response=>{
      this.toastr.success("Silindi")
      window.location.reload()
    },responseError=>{
      this.toastr.error("Silinemedi!")
    })
  }

  deleteColor(color:Color){
    this.colorService.deleteColor(color).subscribe(response=>{
      this.toastr.success("Silindi")
      window.location.reload()
    },responseError=>{
      this.toastr.error("Silinemedi!")
    })
  }


}
