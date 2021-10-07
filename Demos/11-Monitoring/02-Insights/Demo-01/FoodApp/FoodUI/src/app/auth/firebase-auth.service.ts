import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { from } from "rxjs";
import { AuthFacade } from "./store/facades/auth.facade";

@Injectable({
  providedIn: "root",
})
export class FBAuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private authFacade: AuthFacade
  ) {
    this.onUserChanged();
  }

  private persistence = "none";

  private onUserChanged() {
    this.fireAuth.authState.subscribe((user) =>
      this.authFacade.userChanged(user)
    );
  }

  registerUser(email: string, password: string) {
    return from(
      new Promise<firebase.default.auth.UserCredential>((resolve, reject) => {
        this.fireAuth.setPersistence(this.persistence).then(() => {
          this.fireAuth
            .createUserWithEmailAndPassword(email, password)
            .then((cred) => resolve(cred))
            .catch((err) => {
              console.log("Error logging in", err);
              reject(err);
            });
        });
      })
    );
  }

  logOn(email, password) {
    return from(
      new Promise<firebase.default.auth.UserCredential>((resolve, reject) => {
        this.fireAuth.setPersistence(this.persistence).then(() => {
          this.fireAuth
            .signInWithEmailAndPassword(email, password)
            .then((cred) => {
              return resolve(cred);
            })
            .catch((err) => {
              console.log("Error logging in", err);
              reject(err);
            });
        });
      })
    );
  }

  // logOn(email, password): Promise<firebase.default.auth.UserCredential> {
  //   return new Promise<firebase.default.auth.UserCredential>(
  //     (resolve, reject) => {
  //       this.fireAuth.setPersistence(this.persistence).then(() => {
  //         this.fireAuth
  //           .signInWithEmailAndPassword(email, password)
  //           .then((cred) => {
  //             return resolve(cred);
  //           })
  //           .catch((err) => {
  //             console.log("Error logging in", err);
  //             reject(err);
  //           });
  //       });
  //     }
  //   );
  // }

  logOff() {
    return from(
      this.fireAuth
        .signOut()
        .catch((err) => console.log("Error logging out", err))
    );
  }
}
