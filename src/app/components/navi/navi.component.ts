import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private authService:AuthService, private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
  }
  isLogOK(){
    console.log("heyhey")
    if(localStorage.getItem("token")){
      return true;
    } else {
      return false;
    }
  }

  getUser(){
    return localStorage.getItem('fullName');
    }

  logout(){
    this.authService.logOut();
    this.toastrService.info("Çıkış Yaptınız");
    this.router.navigate(['']);
  }


}
