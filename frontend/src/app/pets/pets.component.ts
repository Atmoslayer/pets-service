import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {first} from "rxjs";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
  providers: [ApiService]
})

export class PetsComponent {
  pets = [{name: ''}, {type: ''}, {age: ''}, {breed: ''}];
  hasPets = false
  selectedPet = <any>[]

  constructor(private api: ApiService, private router: Router) {
    this.getPets();
    this.selectedPet = {id: -2, name: '', type: '', age: '', breed: ''};
  }

  getPets = () => {
    this.api.getAllPets().subscribe(
      data => {if (data != '') {
        this.hasPets = true;
      }
        this.pets = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  petClicked = (pet: any) => {
    this.api.getOnePet(pet.id).subscribe(
      data => {
        this.selectedPet = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  updatePet = () => {
    this.api.updatePet(this.selectedPet).subscribe(
      data => {
        this.getPets();
      },
      error => {
        console.log(error)
      }
    )
  }

  createPet = () => {
    this.api.createPet(this.selectedPet).subscribe(
      data => {
        this.pets.push(data);
      },
      error => {
        console.log(error)
      }
    )
  }

  deletePet = () => {
    this.api.deletePet(this.selectedPet.id).subscribe(
      data => {
       this.getPets();
      },
      error => {
        console.log(error)
      }
    )
  }

  reloadPage($check: string = ''): void {
    window.location.reload();
  }

  goToLogin($check: string = ''): void {
    const navigationDetails: string[] = ['/login'];
    if($check.length) {
      navigationDetails.push($check);
    }
    this.router.navigate(navigationDetails);
  }

  logout() {
    localStorage.removeItem("currentUser");
  }
}
