import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import { AuthData } from './auth-data.model';

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
    private store: Store<fromRoot.State>,
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
    this.store.dispatch(new UI.StartLoading());
    this.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then(() => this.store.dispatch(new UI.StopLoading))
    .catch(error => {
      this.uiservice.showSnackbar(error.message,null ,{ duration: 3000});
      this.store.dispatch(new UI.StopLoading());
    })
  }

  login(authData: AuthData){
    this.store.dispatch(new UI.StartLoading());
    this.auth.signInWithEmailAndPassword(authData.email,authData.password)
      .then(() => this.store.dispatch(new UI.StopLoading))
      .catch(error => {
        this.uiservice.showSnackbar(error.message,null ,{ duration: 3000});
        this.store.dispatch(new UI.StopLoading());
    });
}

  logout() {
    this.auth.signOut();
  }

  isAuth(){
    return this.isAuthenticated;
  }

}
