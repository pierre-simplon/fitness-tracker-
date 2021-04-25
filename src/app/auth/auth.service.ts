import { User } from './user.model'
import { AuthData } from './auth-data.model'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated:boolean = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
  ) { }

  registerUser(authData: AuthData) {
    this.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.authSuccessfully();
    })
    .catch(error => { console.log(error);
    })
  }

  login(authData: AuthData){
    this.auth.signInWithEmailAndPassword(authData.email,authData.password)
    .then(result => {
      this.authSuccessfully();
    })
    .catch(error => { console.log(error);
    });
}

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login'])
    this.isAuthenticated = false;
    this.auth.signOut();
  }

  isAuth(){
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }
}
