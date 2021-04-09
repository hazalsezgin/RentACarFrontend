import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {
  colorAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private colorService: ColorService, 
    private toastrService: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.addColor(colorModel).subscribe(response => {
        this.toastrService.success("Add OK")
        this.router.navigate(['/all/list']);
      }, responseError => {
        console.log(responseError.error.ValidationErrors)
        if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage);
          }
        }
      })
    }
    else {
      this.toastrService.error("Form Error")
    }
  }

}
