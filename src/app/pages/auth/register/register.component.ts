import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private _snackbar: MatSnackBar
  ) {}
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', Validators.required),
  });

  submit() {
    const name = this.form.value.name + ' ' + this.form.value.lastName;
    this.authService
      .signUp(this.form.value.email, this.form.value.password, name)
      .subscribe(
        (res) => {
          console.log(res);

          localStorage.setItem('user', JSON.stringify(res));
          this.form.reset();
        },
        (error) => {
          console.log('test');
          this._snackbar.open(error.error.error.message, 'close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
          });
          this.form.reset();
          console.log(error.error.error.message);
        }
      );
  }
}
