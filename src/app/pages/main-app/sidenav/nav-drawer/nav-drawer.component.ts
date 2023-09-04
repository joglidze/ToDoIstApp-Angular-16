import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';
@Component({
  selector: 'app-nav-drawer',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, RouterModule],
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
})
export class NavDrawerComponent {
  panelOpenState!: boolean;

  constructor(
    private projectService: ProjectService,
    private localService: LocalstorageService
  ) {}

  createProject(projectName: any) {
    
    this.projectService
      .createProject(this.localService.localUser(), projectName.value, projectName)
      .subscribe(console.log);
  }
}
