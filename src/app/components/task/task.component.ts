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
    private taskService: TaskService,
    private localService: LocalstorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  removeTask(task: any) {
    
    if (this.url == 'inbox') {
      this.taskService
        .delete(`${this.localService.localUser()}/inbox/${task}.json/`)
        .subscribe((res) => {
         
          this.refreshPage();
        });
    } else if (this.url == 'today') {
      this.taskService
        .delete(`${this.localService.localUser()}/today/${task}.json/`)
        .subscribe((res) => {
            
          this.refreshPage();
        });
    }
  }
  closeTask(data: any) {
    this.taskTrigger = data;

    this.refreshPage();
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
