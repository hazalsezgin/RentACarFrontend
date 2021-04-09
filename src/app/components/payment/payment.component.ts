import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental:Rental;
  car:Car;
  amount:number;

  imageUrl = 'https://localhost:44324/'

  cardNumber: string;
  nameOnTheCard: string;
  expirationDate: string;
  cvv: number;
  cardId: number;
  creditCards: CreditCard[] = [];
  cardAddForm: FormGroup;


  constructor(private router: Router,private paymentService: PaymentService,private formBuilder: FormBuilder,
    private rentalService: RentalService, private toastrService:ToastrService, private creditCardService:CreditCardService,
    private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }


  createCreditCardForm() {
    this.cardAddForm = this.formBuilder.group({
      customerCard: ['', Validators.required],
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }

  save() {
    let cardModel: CreditCard = {
      cardNumber: this.cardNumber,
      nameOnTheCard: this.nameOnTheCard,
      expirationDate: this.expirationDate,
      cvv: this.cvv,
      customerId: this.rental.customerId,
    };
    this.creditCardService.add(cardModel).subscribe((response) => {
      this.toastrService.success('SAVE OK');
      this.payment();
    }, responseCardError => {
      this.toastrService.error('ERRORR!!');
    }
    );
  }

  notSave() {
    this.payment();
  }

  getCardByCustomer() {
    this.creditCardService.getByCustomerId(this.rental.customerId).subscribe(response => {
      this.creditCards = response.data;
      console.info(this.creditCards);
      this.setCard();
    });
  }

  setCard() {
    this.creditCards.forEach(response => {
      this.cardNumber = response.cardNumber;
      this.nameOnTheCard = response.nameOnTheCard;
      this.expirationDate = response.expirationDate;
      this.cvv = response.cvv;
    });
  }

  setCardInfos() {
    this.cardAddForm.patchValue({
      cardNumber: this.cardNumber,
      nameOnTheCard: this.nameOnTheCard,
      expirationDate: this.expirationDate,
      cvv: this.cvv,
    });
  }

  getCar() {
    this.carService.getCarDetails(this.rental.carId).subscribe(response => {
      this.car = response.data;
      this.totalPayment();
    })
  }

  totalPayment() {
    if (this.rental.returnDate != null) {
      let dateRent = new Date(this.rental.returnDate.toString());
      let dateReturn = new Date(this.rental.rentDate.toString());
      let difference = (dateRent.getTime() - dateReturn.getTime());
      let differenceOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      if (differenceOfDays == 0) {
        differenceOfDays = 1;
      }
      this.amount = differenceOfDays * (this.car.dailyPrice + (this.car.dailyPrice * 8 / 100)); 
    }
  }

  payment() {
    if (this.amount > 100) {
      let paymentModel: Payment = {
        amount: this.amount
      }
      console.log(paymentModel.amount)
      this.paymentService.payment(paymentModel).subscribe(response => {
        this.toastrService.success("Payment OK");
      }, error => {
        console.log(error)
        this.toastrService.error(error.error);
      }
      )
    }
  }


}
