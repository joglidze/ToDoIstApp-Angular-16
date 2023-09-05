import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskComponent } from '../task/task.component';
import { Observable } from 'rxjs';
import { ProjectTasksService } from 'src/app/core/services/project-tasks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, TaskComponent],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  taskTrigger: boolean = false;
  route = this.activatedRoute.snapshot.url[1].path;
  projectTasks$: Observable<any> | undefined;
  ngOnInit(): void {
    this.getProjectTasks();
    console.log(this.route);
  }
  constructor(
    private projectTaskService: ProjectTasksService,

    private activatedRoute: ActivatedRoute
  ) {}
  closeTask(test: any) {
    this.taskTrigger = test;
  }

  getProjectTasks() {
    this.projectTaskService.getProjectTasks(this.route);

    this.projectTasks$ = this.projectTaskService.mainProjectArray$;
  }

  deleteProjectTask(id: string, ) {
    this.projectTaskService.deleteTask(id, this.route);
  }
}
