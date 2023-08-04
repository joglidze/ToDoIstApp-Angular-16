import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, NavDrawerComponent,RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() nav: any = true;
  test: any;

 
}
