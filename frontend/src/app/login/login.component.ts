import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from "../api.service";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService]
})


export class LoginComponent implements OnInit {

  form: FormGroup = <any>[];
  submitted = false;

  constructor(private authService: ApiService, private router: Router, private route: ActivatedRoute)  { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        username: new FormControl(''),
        password: new FormControl(''),
      }
    );
  }

  get currentForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.currentForm['username'].value, this.currentForm['password'].value).pipe(first()).subscribe(
      data => {
        console.log(data);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      }
    )
  }

  goToRegistration($check: string = ''): void {
    const navigationDetails: string[] = ['/registration'];
    if($check.length) {
      navigationDetails.push($check);
    }
    this.router.navigate(navigationDetails);
  }

}
