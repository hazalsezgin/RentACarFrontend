import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars:Car[]=[]; 
  images:CarImage[];
  dataLoaded=false;
  filterText="";
  currentCar:Car;
  
  imageUrl='https://localhost:44324/';

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        console.log("hey")
        this.getCarsByBrand(params["brandId"])
      }else if(params["carId"]){
        this.getCarImagesByCarId(params["carId"])
        this.dataLoaded=true;
        
      }else{
        this.getCars()
      }
    }) 
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
      this.dataLoaded=true;
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded=true;
    })
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByBrand(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded=true;
    })

  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
     this.images=response.data;
     console.log(response);
    })
  }

  getSliderClassName(index:Number){
    if(index==0){
      return "carousel-item active";
    }else{
      return "carousel-item"
    }
  }

  setCurrentCar(car:Car){
    this.currentCar = car;
  }

}
