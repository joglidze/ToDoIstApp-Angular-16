import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [CommonModule, SidenavComponent, HeaderComponent],
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent implements OnInit {
  navToggle: any;
  ngOnInit(): void {
    this.navToggle = true;
  }
  navBoolean(event: any) {
    this.navToggle = event;
    console.log(event);
  }
}
