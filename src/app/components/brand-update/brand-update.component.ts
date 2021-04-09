import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm:FormGroup;
  brand:Brand;

  constructor(private formBuilder:FormBuilder, private brandService:BrandService,private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['brandId']) {
        this.getBrandByCarId(parameter['brandId']);
      }
    });
  }

  getBrandByCarId(id: number) {
    this.brandService.getBrandByCarId(id).subscribe((response) => {
        this.brand = response.data;
        this.brandUpdateForm.setValue({
          name:this.brand.brandName
        })
      }
    );
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brand: Brand = this.brandUpdateForm.value;
      brand.brandId = this.brand.brandId;
      this.brandService.updateBrand(brand).subscribe((response) => {
          this.toastrService.success("Güncellendi");
          this.router.navigate(['/list']);
        },responseError=>{
          this.toastrService.error(responseError.error)
        });
    }else{
      this.toastrService.warning('Hata!');
    }
  }


}
