import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Observable} from 'rxjs';

import { TaskComponent } from '../task/task.component';

import { TodayStoreService } from 'src/app/core/services/today-store.service';

@Component({
  selector: 'app-today-section',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, TaskComponent],
  templateUrl: './today-section.component.html',
  styleUrls: ['./today-section.component.scss'],
})
export class TodaySectionComponent implements OnInit {
  taskBoolean: boolean = false;
  todayTaskArray$: Observable<any> | undefined;
  date = new Date();
  closeTask(close: any) {
    this.taskBoolean = close;
    this.getTodayTasks();
  }
  constructor(
    
    private todayStore: TodayStoreService
  ) {}
  ngOnInit(): void {
    this.getTodayTasks();
  }

  getTodayTasks() {
    this.todayTaskArray$ = this.todayStore.todayArray$;
  }
}
