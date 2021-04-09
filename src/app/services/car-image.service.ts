import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl='https://localhost:44324/api/carimages/'

  constructor(private httpClient:HttpClient) { }

  getCarImages():Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"getimagesbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  addImage(image: File,carId:number):Observable<any> {

    console.log(image.name)
    console.log(carId)
    const formData:FormData = new FormData();

    formData.append('Image', image);
    formData.append('CarId',carId.toString());

    let newPath=this.apiUrl+'add';
    return this.httpClient.post<ResponseModel>(newPath,formData,{
      reportProgress: true,
      responseType: 'json',
    });
    
  }
}
