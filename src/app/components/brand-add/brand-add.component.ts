import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private brandService:BrandService,
    private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }

  addBrand(){
    if(this.brandAddForm.valid)
    {
      let brandModel:Brand = Object.assign({}, this.brandAddForm.value)
      this.brandService.addBrand(brandModel).subscribe(response=>{
        this.toastrService.success("OK")
        this.router.navigate(['/all/list']);
      },responseError=>{
        console.log(responseError.error.ValidationErrors)
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length ; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage);
          }
        }
      })
    }
    else{
      this.toastrService.error("Hata!")
    }

  }

}
