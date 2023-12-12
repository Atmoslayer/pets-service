import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup = <any>[];
  submitted = false;
  user = <any>[]

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute)  { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        username: new FormControl(''),
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
      }
    );
  }

  get currentForm() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.apiService.createUser(
      this.currentForm['username'].value,
      this.currentForm['first_name'].value,
      this.currentForm['last_name'].value,
      this.currentForm['email'].value,
      this.currentForm['password'].value
    ).pipe(first()).subscribe(
      data => {
        this.user.push(data);
      },
      error => {
        console.log(error)
      }
    )

    this.goToLogin()
  }

  goToLogin($check: string = ''): void {
    const navigationDetails: string[] = ['/login'];
    if($check.length) {
      navigationDetails.push($check);
    }
    this.router.navigate(navigationDetails);
  }

}
