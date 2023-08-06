import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LocalstorageService } from 'src/app/facade/localstorage.service';
import { TaskService } from 'src/app/core/services/task.service';
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    FormsModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  events: string[] = [];
  form: FormGroup = new FormGroup({
    taskName: new FormControl('', Validators.required),
    taskDescripiton: new FormControl('', Validators.required),
    taskDate: new FormControl('', Validators.required),
    taskPriority: new FormControl('', Validators.required),
  });

  @Output() openTask: any = new EventEmitter<boolean>();
  taskBoolean: boolean = false;
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  closeTask() {
    this.openTask.emit(this.taskBoolean);
  }
  constructor(
    private taskService: TaskService,
    private localService: LocalstorageService
  ) {}

  submit() {
    this.taskService
      .post(`${this.localService.localUser()}/inbox.json`, this.form.value)
      .subscribe((res) => {
        console.log(res);
      });
    console.log(this.localService.localUser);
  }
}
