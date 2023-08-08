import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from 'src/app/core/services/task.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';
import { TaskComponent } from '../task/task.component';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, TaskComponent],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  taskTrigger: boolean = false;
  taskArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private taskService: TaskService,
    private localService: LocalstorageService
  ) {}
  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() {
    this.taskService
      .get(`${this.localService.localUser()}/inbox.json`)
      .pipe(map((res: any) => Object.entries(res)))
      .subscribe((res: any) => {
        console.log(res);
        this.taskArray.next([...res]);
        console.log(this.taskArray);
      });
  }

  closeTask(test: any) {
    this.taskTrigger = test;
    console.log(test);
    this.getTasks();
  }
}
