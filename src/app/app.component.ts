import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { cl } from '@fullcalendar/core/internal-common';
import { StoreService } from './core/services/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  template: '<router-outlet/>',
})
export class AppComponent implements OnInit {
  title = 'todoistApp';
  constructor(private store:StoreService){}
  ngOnInit(): void {
    console.log('test');
    this.store.getTasks()
  }
}
