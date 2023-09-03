import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { cl } from '@fullcalendar/core/internal-common';
import { StoreService } from 'src/app/core/services/store.service';
import { Task } from 'src/app/core/interfaces/task';

@Component({
  selector: 'app-create-task',

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
  standalone: true,
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  events: string[] = [];
  route = this.activatedRoute.snapshot.url.join('');
  form: FormGroup = new FormGroup({
    taskName: new FormControl('', Validators.required),
    taskDescripiton: new FormControl('', Validators.required),

    taskStart: new FormControl('', Validators.required),
    taskEnd: new FormControl('', Validators.required),
    taskPriority: new FormControl('', Validators.required),
  });
  @Input() dataTask!: Task;
  @Output() openTask = new EventEmitter<boolean>();
  taskBoolean: boolean = false;
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  ngOnInit(): void {
    if (this.dataTask) {
      this.form.patchValue(this.dataTask[1]);
    }

    if (this.route == 'today') {
      const currentDate = new Date();
      this.form.get('taskStart')?.setValue(currentDate);
      this.form.get('taskEnd')?.setValue(currentDate);
    }
  }
  closeTask() {
   
    this.openTask.emit(this.taskBoolean);
  }
  constructor(
    private taskService: TaskService,
    private localService: LocalstorageService,
    private activatedRoute: ActivatedRoute,
    private store: StoreService
  ) {}

  submit() {
    if (this.dataTask) {
      this.store.putTask(this.dataTask, this.form.value, this.route);
      this.closeTask();
    } else {
      this.store.createTasks(this.form.value, this.route);
      this.closeTask();
    }
  }

  createDate(start: any, end: any) {
    const date = this.form.value.taskStart.toString();
    const finishDate = this.form.value.taskEnd.toString();
    const startDate =
      date.slice(0, 15) +
      ' ' +
      start.value +
      ':00 ' +
      date.slice(25, date.length);
    const endDate =
      finishDate.slice(0, 15) +
      ' ' +
      end.value +
      ':00 ' +
      finishDate.slice(25, finishDate.length);

    this.form.get('taskStart')?.setValue(new Date(startDate));
    this.form.get('taskEnd')?.setValue(new Date(endDate));

    console.log(this.form.value);
  }
}
