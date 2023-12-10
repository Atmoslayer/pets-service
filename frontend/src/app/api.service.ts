import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authorized_user = JSON.parse(localStorage.getItem("currentUser") || '{}')
  user_token = this.authorized_user.token

  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'token' + ' ' + this.user_token});

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  getAllPets(): Observable<any> {
    return this.http.get(this.baseurl + 'api/pets/',
      {headers: this.httpHeaders});
  }

  getOnePet(id: number): Observable<any> {
    return this.http.get(this.baseurl + 'api/pets/' + id + '/',
      {headers: this.httpHeaders});
  }

  updatePet(pet: any): Observable<any> {
    const body = {
      id: pet.id,
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      owner: this.authorized_user.id
    };
    return this.http.put(this.baseurl + 'api/pets/' + pet.id + '/', body,
      {headers: this.httpHeaders});
  }

  createPet(pet: any): Observable<any> {
    const body = {
      id: pet.id,
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      owner: this.authorized_user.id
    };
    return this.http.post(this.baseurl + 'api/pets/', body,
      {headers: this.httpHeaders});
  }

  deletePet(id: any): Observable<any> {
    return this.http.delete(this.baseurl + 'api/pets/' + id + '/',
      {headers: this.httpHeaders});
  }

  createUser(username: string, first_name: string, last_name: string, email: string, password: string): Observable<any> {
    const body = {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    };
    return this.http.post(this.baseurl + 'api/registration/', body,
      {headers: this.httpHeaders});
  }


  login(username: string, password: string) {
    return this.http.post<any>(this.baseurl + 'api-token-auth/',
      {username, password}).pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem("currentUser", JSON.stringify(user));
          }
          return user;
        })
      );
  }
}

