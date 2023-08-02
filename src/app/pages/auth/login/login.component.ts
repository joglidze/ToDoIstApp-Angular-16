import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private _snackbar: MatSnackBar
  ) {}

  submit() {
    this.authService
      .loginIn(this.form.value.email, this.form.value.password)
      .pipe(
        tap((res) => {
          localStorage.setItem('user', JSON.stringify(res));
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.form.reset();
        },
        (error) => {
          this._snackbar.open(error.error.error.message, 'close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
          });
          console.log(error.error.error);
        }
      );
  }
}
