import { User } from './user.model'
import { AuthData } from './auth-data.model'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated:boolean = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiservice: UIService,
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.authChange.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['/training'])
      }
      else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData: AuthData) {
    this.uiservice.loadingStateChanged.next(true);
    this.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then(() => {this.uiservice.loadingStateChanged.next(false)})
    .catch(error => {
      this.uiservice.showSnackbar(error.message,null ,{ duration: 3000});
      this.uiservice.loadingStateChanged.next(false);
    })
  }

  login(authData: AuthData){
    this.uiservice.loadingStateChanged.next(true);
    this.auth.signInWithEmailAndPassword(authData.email,authData.password)
      .then(() => {this.uiservice.loadingStateChanged.next(false)})
      .catch(error => {
        this.uiservice.showSnackbar(error.message,null ,{ duration: 3000});
        this.uiservice.loadingStateChanged.next(false);
    });
}

  logout() {
    this.auth.signOut();
  }

  isAuth(){
    return this.isAuthenticated;
  }

}
