import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { RouterOutlet } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, NavDrawerComponent, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  mobileQuery!: MediaQueryList;
  @Input() nav: any = true;
  test: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width:750px)');
    this.mobileQueryListener();
    this.mobileQuery.addListener(this.mobileQueryListener.bind(this));
  }
  mobileQueryListener() {
    if (this.mobileQuery?.matches == true) {
      this.nav = false;
    } else {
      this.nav = true;
    }

    this.changeDetectorRef?.detectChanges();
  }
}
