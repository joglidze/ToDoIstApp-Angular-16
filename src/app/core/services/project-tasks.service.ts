import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { BaseService } from './base.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectTasksService {
  private projectTaskSubject$ = new BehaviorSubject([]);
  mainProjectArray$ = this.projectTaskSubject$.asObservable();
  constructor(
    private baseService: BaseService,
    private localService: LocalstorageService
  ) {}

  getProjectTasks(projectName: string) {
    this.baseService
      .get(`${this.localService.localUser()}/${projectName}.json`)
      .pipe(
        map((res: any) => Object.entries(res)),
        tap((res) => console.log(res))
      )
      .subscribe((res: any) => this.projectTaskSubject$.next(res));
  }

  deleteTask(id: string, url: any) {
    const array = this.projectTaskSubject$.getValue();
    const index = array.map((res) => res[0]).findIndex((res) => res == id);

    this.baseService
      .delete(`${this.localService.localUser()}/${url}/${id}.json/`)
      .subscribe((res) => {
        array.splice(index, 1);
      });
  }
  createTasks(form: any, route: string) {
    const allTasks = this.projectTaskSubject$.getValue();
    this.baseService
      .post(`${this.localService.localUser()}/${route}.json`, form)
      .subscribe((res: any) => {
        const newAllTasks: any = [...allTasks, [res.name, form]];

        this.projectTaskSubject$.next(newAllTasks);
        console.log(newAllTasks);
      });
  }

  putTask(dataTask: any, form: any, route: any) {
    let array: any = this.projectTaskSubject$.getValue();
    const index = array
      .map((res: any) => res[0])
      .findIndex((res: any) => res == dataTask[0]);

    this.baseService
      .put(
        `${this.localService.localUser()}/${route}/${dataTask[0]}.json`,
        form
      )
      .subscribe((res) => {
        array[index] = [dataTask[0], form];
      });
  }
}
