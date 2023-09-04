import {
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { BaseService } from 'src/app/core/services/base.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';
import { TaskComponent } from '../task/task.component';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { StoreService } from 'src/app/core/services/store.service';
import { TodayStoreService } from 'src/app/core/services/today-store.service';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, TaskComponent],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  taskTrigger: boolean = false;
  taskArray$: Observable<any> | undefined;

  constructor(
    private storeService: StoreService,
    private todayService: TodayStoreService
  ) {}
  ngOnInit(): void {
    this.taskArray$ = this.storeService.tasks$;
    if (this.taskTrigger || !this.taskTrigger) {
      console.log('work');
    }
  }

  closeTask(test: any) {
    this.taskTrigger = test;
    this.taskArray$ = this.storeService.tasks$;
  }
}
