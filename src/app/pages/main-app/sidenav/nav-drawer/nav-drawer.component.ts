import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectNavService } from 'src/app/core/services/projectnav.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-nav-drawer',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, RouterModule],
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
})
export class NavDrawerComponent implements OnInit {
  panelOpenState!: boolean;
  projectNamesArray$?: Observable<string[]>;

  constructor(
    private projectService: ProjectNavService,
    private localService: LocalstorageService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getProject();
  }
  createProject(projectName: any) {
    const task = {
      taskDescripiton: 'description hear',
      taskEnd: 'End Date',
      taskName: 'Create Task here',
      taskPriority: '3',
      taskStart: 'Start Date',
    };
    this.projectService.createProject(
      this.localService.localUser(),
      projectName.value,
      task
    );
    this.getProject()
  }

  getProject() {
    this.projectNamesArray$ = this.projectService
      .getProjects()
      .pipe(
        map((res: any) =>
          Object.keys(res).filter((res) => res !== 'today' && res !== 'inbox')
        )
      );
  }
  deleteProject(id: string, projectName: string) {
    this.projectService.deleteTask(id, projectName);
    this.getProject()
  }
}
