import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Observable, map } from 'rxjs';
import { TaskService } from 'src/app/core/services/task.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';
import { TaskComponent } from '../task/task.component';
import { ActivatedRoute } from '@angular/router';
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
    private taskService: TaskService,
    private localService: LocalstorageService,
    private todayStore: TodayStoreService
  ) {}
  ngOnInit(): void {
    this.getTodayTasks();
  }

  getTodayTasks() {
    this.todayTaskArray$ = this.todayStore.todayArray$
  }
}
