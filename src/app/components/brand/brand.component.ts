import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[]=[];
  currentBrand:Brand;
  allBrand:Brand;
  @Output() brandId = new EventEmitter<string>();
  

  constructor(private brandService:BrandService) { }

  ngOnInit(): void { 
    console.log("silme burda yazı kalsın")
    this.getBrands(); 
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand =brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  setCurrentBrand2(){    
    this.brandId.emit(this.currentBrand?.brandId.toString());
  } 

  allBrandSelected(){
    return this.currentBrand == undefined ? true : false;
  } 

}
