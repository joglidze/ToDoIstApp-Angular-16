import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BaseService } from './base.service';
import { T } from '@fullcalendar/core/internal-common';
import { LocalstorageService } from 'src/app/facade/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectNavService {
  private projectSubject$ = new BehaviorSubject([]);
  projectArray$ = this.projectSubject$.asObservable();

  constructor(
    private baseService: BaseService,
    private localService: LocalstorageService
  ) {}
  createProject(localSerivce: string, projectName: string, load: any) {
    const allNavTask = this.projectSubject$.getValue();

    this.baseService
      .post(`${localSerivce}/${projectName}.json`, load)
      .subscribe((res) => {
        const newTasks: any = [...allNavTask, [projectName]];
       
        
        this.projectSubject$.next(newTasks);
      });
  }

  getProjects() {
    return this.baseService
      .get(`${this.localService.localUser()}.json`)
      .pipe(map((res: any) => Object.keys(res)))
      .subscribe((res: any) => this.projectSubject$.next(res));
  }
  deleteTask(id: string, name: any) {
    const array = this.projectSubject$.getValue();
    const index = array.map((res) => res[0]).findIndex((res) => res == id);

    this.baseService
      .delete(`${this.localService.localUser()}/${name}.json/`)
      .subscribe((res) => {
        array.splice(index, 1);
        this.projectSubject$.next(array);
      });
  }
}
