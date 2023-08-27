import {
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from 'src/app/core/services/task.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';
import { TaskComponent } from '../task/task.component';
import { BehaviorSubject, Observable, map } from 'rxjs';

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
    private taskService: TaskService,
    private localService: LocalstorageService
  ) {}
  ngOnInit(): void {
    this.getTasks()
    if (this.taskTrigger || !this.taskTrigger) {
      console.log('work');
    }
  }

  getTasks() {
    this.taskArray$ = this.taskService
      .get(`${this.localService.localUser()}/inbox.json`)
      .pipe(map((res: any) => Object.entries(res)));
  }

  closeTask(test: any) {
    this.taskTrigger = test;
    this.getTasks();
  }
}
