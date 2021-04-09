import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { DeleteCar } from '../models/deleteCar';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44324/api/cars/' //bu cars için genel olan yol sırf onu eklemedik diye olmamıştı

  constructor(private httpClient:HttpClient) { } // bunun çıkmamasının sebebi eklememişiz şuraya 

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"getCarDetails" //burdada diyoruzki bu method çalışınca apinin sonuna getall ekle
    return this.httpClient.get<ListResponseModel<Car>>(newPath) //newPath deki get isteğini yap diyoruz burda
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"getbybrand?brandId=" + brandId //burdada diyoruzki bu method çalışınca apinin sonuna getall ekle
    return this.httpClient.get<ListResponseModel<Car>>(newPath) //newPath deki get isteğini yap diyoruz burda
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl +"getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarDetails(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + 'getcardetailsbyid?carid='+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }

  addCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",car);
  }

  updateCar(car:Car):Observable<ResponseModel>{
    console.log(car);
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",car);
  }

  deleteCar(car:DeleteCar):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/delete",car);
  }
}
