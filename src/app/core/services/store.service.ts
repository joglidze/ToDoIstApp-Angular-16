import { Injectable } from '@angular/core';
import { BehaviorSubject, map, pipe, shareReplay, tap } from 'rxjs';
import { BaseService } from './base.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private taskSubject$ = new BehaviorSubject([]);

  tasks$ = this.taskSubject$.asObservable();

  constructor(
    private BaseService: BaseService,
    private localService: LocalstorageService,
    private activatedRoute: ActivatedRoute
  ) {}

  getTasks() {
    this.BaseService.get(`${this.localService.localUser()}/inbox.json`)
      .pipe(
        map((res: any) => Object.entries(res)),
        tap((res) => console.log(res))
      )
      .subscribe((res: any) => this.taskSubject$.next(res));
  }

  createTasks(form: any, route: string) {
    const allTasks = this.taskSubject$.getValue();
    this.BaseService.post(
      `${this.localService.localUser()}/${route}.json`,
      form
    )
      .pipe()
      .subscribe((res: any) => {
        const newAllTasks: any = [...allTasks, [res.name, form]];

        this.taskSubject$.next(newAllTasks);
        console.log(newAllTasks);
      });

    console.log(allTasks);
  }

  putTask(dataTask: any, form: any, route: any) {
    let array: any = this.taskSubject$.getValue();
    const index = array
      .map((res: any) => res[0])
      .findIndex((res: any) => res == dataTask[0]);

    this.BaseService.put(
      `${this.localService.localUser()}/${route}/${dataTask[0]}.json`,
      form
    ).subscribe((res) => {
      array[index] = [dataTask[0], form];
    });
  }

  deleteTask(id: string, url: any) {
    const array = this.taskSubject$.getValue();
    const index = array.map((res) => res[0]).findIndex((res) => res == id);

    this.BaseService.delete(
      `${this.localService.localUser()}/${url}/${id}.json/`
    ).subscribe((res) => {
      array.splice(index, 1);
    });
  }
}
