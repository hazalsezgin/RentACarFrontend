import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:Rental[]=[]
  dataLoaded=false;
  customers: Customer[];

  customerId: number;
  rentDate: Date;
  returnDate: Date;
  rentBeginDate: Date;
  rentEndDate: Date;
  @Input() car: Car;

  constructor(private rentalService:RentalService,private router: Router, 
    private customerService: CustomerService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
    })
  }

  getDate(day: number) {
    var today = new Date();
    today.setDate(today.getDate() + day);
    return today.toISOString().slice(0, 10)
  }

  create() {
    let rental: Rental =
    {
      carId: this.car.carId,
      customerId: parseInt(this.customerId.toString()),
      rentDate: this.rentDate,
      returnDate: this.returnDate
    }
    this.rentalService.addRental(rental).subscribe(repsonse=>{
      this.toastr.info("Navigate to  Payment Page");
      this.toastr.success("RENT OK");
      this.router.navigate(['/payment', JSON.stringify(rental)]);
    },error=>{
      console.info(error)
      this.toastr.error(error.error)
      this.toastr.error(error.error.Message)
    })
  }

}
