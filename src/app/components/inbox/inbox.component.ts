import {
 
  Component,
  
  OnInit,
  
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';


import { TaskComponent } from '../task/task.component';
import { Observable,  } from 'rxjs';
import { StoreService } from 'src/app/core/services/store.service';


@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, TaskComponent],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  taskTrigger: boolean = false;
  taskArray$: Observable<any> | undefined;

  constructor(
    private storeService: StoreService,

  ) {}
  ngOnInit(): void {
    this.taskArray$ = this.storeService.tasks$;
    if (this.taskTrigger || !this.taskTrigger) {
      console.log('work');
    }
  }

  closeTask(test: any) {
    this.taskTrigger = test;
    this.taskArray$ = this.storeService.tasks$;
  }
}
