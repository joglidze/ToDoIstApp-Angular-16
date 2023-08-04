import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-nav-drawer',
  standalone: true,
  imports: [CommonModule, MatExpansionModule,RouterModule],
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
})
export class NavDrawerComponent {
  panelOpenState: any;
}
