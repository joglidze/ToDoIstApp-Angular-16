import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from 'src/app/core/services/task.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit{
  taskTrigger: boolean = false;
  
  
  constructor(private taskService:TaskService,private localService:LocalstorageService){}
  ngOnInit(): void {
    this.taskService
    .get(`${this.localService.localUser()}/inbox.json`,)
    .subscribe((res) => {
      console.log(res);
    });
  }
  
  closeTask(test: any) {
    this.taskTrigger = test;
  }
}
