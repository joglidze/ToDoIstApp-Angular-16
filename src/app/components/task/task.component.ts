import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { StoreService } from 'src/app/core/services/store.service';
import { TodayStoreService } from 'src/app/core/services/today-store.service';
import { ProjectTasksService } from 'src/app/core/services/project-tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    CreateTaskComponent,
  ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: any;
  url = this.activatedRoute.snapshot.url.join('');
  editTask: boolean = false;

  taskTrigger: boolean = false;
  constructor(
    private store: StoreService,
    private todayStoreService: TodayStoreService,
    private activatedRoute: ActivatedRoute,
    private projectTaskService: ProjectTasksService
  ) {}

  removeTask(task: any) {
    if (this.url == 'inbox') {
      this.store.deleteTask(task, this.url);
    } else if (this.url == 'today') {
      this.todayStoreService.deleteTask(task, this.url);
    } else {
      this.projectTaskService.deleteTask(
        task,
        this.activatedRoute.snapshot.url[1].path
      );
    }
  }
  closeTask(data: any) {
    this.taskTrigger = data;
  }
}
