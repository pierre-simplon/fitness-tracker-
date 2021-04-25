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
  private user: User;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
  ) { }

  registerUser(authData: AuthData) {
    this.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(error => { console.log(error);
    })
  }

  login(authData: AuthData){
    this.auth.signInWithEmailAndPassword(authData.email,authData.password)
    .then(result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(error => { console.log(error);
    });
}

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }

  getUser(){
    return {...this.user};
  }

  isAuth(){
    return this.user !=null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }
}
