import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      passwords: new FormGroup(
        {
          password: new FormControl("", [
            Validators.required,
            Validators.minLength(4),
          ]),
          passwordRepeat: new FormControl("", [Validators.required]),
        },
        { validators: this.passwordsMatch }
      ),
    });
  }

  registerUser(form: FormGroup) {
    const usr = {
      email: form.value.email,
      password: form.value.passwords.password,
    };
  }

  passwordsMatch(c: AbstractControl): { invalid: boolean } {
    if (c.get("password").value !== c.get("passwordRepeat").value) {
      return { invalid: true };
    }
  }
}
