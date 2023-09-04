import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { T } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService {
  private projectSubject$ = new BehaviorSubject([]);
  projectArray = this.projectSubject$.asObservable();

  createProject(
    localSerivce: string,
    projectName: string,
    load: string
  ): Observable<T> {
    return this.post(`${localSerivce}/${projectName}.json`, load);
  }
}
