import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { TaskService } from './task.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private taskSubject$ = new BehaviorSubject([]);

  tasks$ = this.taskSubject$.asObservable();
  constructor(
    private taskService: TaskService,
    private localService: LocalstorageService
  ) {}

  getTasks() {
    this.taskService
      .get(`${this.localService.localUser()}/inbox.json`)
      .pipe(
        map((res: any) => Object.entries(res)),
        tap((res) => console.log(res))
      )
      .subscribe((res: any) => this.taskSubject$.next(res));
  }
}
