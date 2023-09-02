import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from 'src/app/facade/localstorage.service';
import { TaskService } from 'src/app/core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { StoreService } from 'src/app/core/services/store.service';

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
    
    private activatedRoute: ActivatedRoute
  ) {}

  removeTask(task: any) {
    this.store.deleteTask(task, this.url);
  }
  closeTask(data: any) {
    this.taskTrigger = data;
  }
}
