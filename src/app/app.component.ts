import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreService } from './core/services/store.service';
import { TodayStoreService } from './core/services/today-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  template: '<router-outlet/>',
})
export class AppComponent implements OnInit {
  title = 'todoistApp';
  constructor(private store:StoreService,private todayService:TodayStoreService){}
  ngOnInit(): void {
    
    this.store.getTasks()
    this.todayService.getTodayTask()
  }
}
