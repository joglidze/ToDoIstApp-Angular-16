import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RegisterComponent, LoginComponent, CommonModule, MatTabsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {

  constructor() {}

 
}
