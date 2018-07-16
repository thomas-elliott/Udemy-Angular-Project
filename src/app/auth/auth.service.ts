import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken: string;

  constructor(private router: Router) {}

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        this.userToken = token;
      });
    return this.userToken;
  }

  logout() {
    firebase.auth().signOut();
    this.userToken = null;
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
            this.userToken = token;
          });
        }
    ).catch(
      response => console.log(response)
    );
  }

  isAuthenticated() {
    return this.userToken != null;
  }
}
