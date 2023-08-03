import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-nav-drawer',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
})
export class NavDrawerComponent {
  panelOpenState: any;
}
