import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carAddForm:FormGroup;
  brands:Brand[];
  colors:Color[];

  constructor(private formBuilder:FormBuilder, private carService:CarService, private brandService:BrandService,
    private colorService:ColorService, private toastrService: ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createCarAddForm()
    this.getBrands();
    this.getColors();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      minFindexScore:["",Validators.required]
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
       this.colors = response.data;
    })
  }

  addCar(){
    if(this.carAddForm.valid){      
      let carModel = Object.assign({},this.carAddForm.value)
      console.log(carModel)
      this.carService.addCar(carModel).subscribe(response=>{
        this.toastrService.success("OK")
        this.router.navigate(['/all/list']);
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length ; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage);
          }
        }
      })
    }else{
      this.toastrService.error('Hata!')
    }
  }

}
