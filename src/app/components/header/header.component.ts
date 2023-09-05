import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() nav = new EventEmitter<boolean>();

  navBoolean = signal(true);
  test = signal(true);

  constructor(private authService: AuthService, private router: Router) {}

  navToggle() {
    // this.navBoolean.set(!this.navBoolean);

    this.nav.emit(this.navBoolean());
    this.navBoolean.update((old) => (old = !old));
  }

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('auth');
  }
}
