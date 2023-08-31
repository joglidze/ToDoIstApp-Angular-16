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
  @Input() dataTask: any;
  @Output() openTask: any = new EventEmitter<boolean>();
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
    console.log(this.form.value);
  }
  closeTask() {
    this.openTask.emit(this.taskBoolean);

    console.log(this.dataTask);
  }
  constructor(
    private taskService: TaskService,
    private localService: LocalstorageService,
    private activatedRoute: ActivatedRoute
  ) {}

  submit() {
    if (this.dataTask) {
      this.taskService
        .put(
          `${this.localService.localUser()}/${this.route}/${
            this.dataTask[0]
          }.json`,
          this.form.value
        )
        .subscribe((res) => {
          console.log('edit');
          this.closeTask();
        });
    } else {
      this.taskService
        .post(
          `${this.localService.localUser()}/${this.route}.json`,
          this.form.value
        )
        .subscribe((res) => {
          console.log('today');
          console.log(res);
          this.closeTask();
        });
    }

    console.log(this.localService.localUser);
  }

  createDate(start: any, end: any) {
    const date: any = this.form.value.taskStart.toString();
    const startDate =
      date.slice(0, 15) +
      ' ' +
      start.value +
      ':00 ' +
      date.slice(25, date.length);

    this.form.get('taskStart')?.setValue(new Date(startDate));

    console.log(this.form.value);
  }
}
