import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
apiUrl='https://localhost:44324/api/colors/'
  constructor(private httpClient:HttpClient) { }

getColors():Observable<ListResponseModel<Color>>{
  let newPath = this.apiUrl +"getall"
  return this.httpClient.get<ListResponseModel<Color>>(newPath)
}

addColor(color:Color):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color);
}

updateColor(color:Color):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"update",color);
}

deleteColor(color:Color):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",color);
}
getColorByCarId(colorId: number): Observable<SingleResponseModel<Color>> {
  let newUrl = this.apiUrl+'getbyid?id='+colorId;
  return this.httpClient.get<SingleResponseModel<Color>>(newUrl);
}

}