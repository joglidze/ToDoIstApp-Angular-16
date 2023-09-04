import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { TaskService } from './task.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class TodayStoreService {
  private todayTask$ = new BehaviorSubject([]);

  todayArray$ = this.todayTask$.asObservable();

  constructor(
    private taskService: TaskService,
    private localService: LocalstorageService
  ) {}

  getTodayTask() {
    this.taskService
      .get(`${this.localService.localUser()}/today.json`)
      .pipe(
        map((res: any) => Object.entries(res)),
        tap((res) => console.log(res))
      )
      .subscribe((res: any) => this.todayTask$.next(res));
  }

  createTasks(form: any, route: string) {
    const allTasks = this.todayTask$.getValue();
    this.taskService
      .post(`${this.localService.localUser()}/${route}.json`, form)
      .subscribe((res: any) => {
        const newAllTasks: any = [...allTasks, [res.name, form]];

        this.todayTask$.next(newAllTasks);
        console.log(newAllTasks);
      });
  }
  putTask(dataTask: any, form: any, route: any) {
    let array: any = this.todayTask$.getValue();
    const index = array
      .map((res: any) => res[0])
      .findIndex((res: any) => res == dataTask[0]);

    this.taskService
      .put(
        `${this.localService.localUser()}/${route}/${dataTask[0]}.json`,
        form
      )
      .subscribe((res) => {
        array[index] = [dataTask[0], form];
      });
  }

  deleteTask(id: string, url: any) {
    const array = this.todayTask$.getValue();
    const index = array.map((res) => res[0]).findIndex((res) => res == id);

    this.taskService
      .delete(`${this.localService.localUser()}/${url}/${id}.json/`)
      .subscribe((res) => {
        array.splice(index, 1);
      });
  }
}
