import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import {ApiService} from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginTxt = 'Login';
  login: Login = {
    phonenumber: "9014316143",
    password: 'homoSapiensSuck!'
  };
  data: any;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    
  }
  loginMethod(){
    console.log("Logging In!");
    this.apiService.getConfig(this.login.phonenumber,this.login.password)
    .subscribe(
      data => {
        this.data = data
        console.log(data);
        this.router.navigate(['/', 'products']);
      },
      error => {
          this.data = error;
          alert(JSON.stringify(this.data.error.data));
      });
  }
}