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
export class CreateTaskComponent implements OnInit {
  events: string[] = [];
  form: FormGroup = new FormGroup({
    taskName: new FormControl('', Validators.required),
    taskDescripiton: new FormControl('', Validators.required),
    taskDate: new FormControl('', Validators.required),
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
  }
  closeTask() {
    this.openTask.emit(this.form.value);
    this.openTask.emit(this.taskBoolean);
    
    console.log(this.dataTask);
  }
  constructor(
    private taskService: TaskService,
    private localService: LocalstorageService,
    private activatedRoute: ActivatedRoute
  ) {}

  submit() {
    const route = this.activatedRoute.snapshot.url.join('');
    if (this.dataTask) {
      this.taskService
        .put(
          `${this.localService.localUser()}/${route}/${this.dataTask[0]}.json`,
          this.form.value
        )
        .subscribe((res) => {
          
          this.closeTask();
        });
    } else {
      this.taskService
        .post(`${this.localService.localUser()}/${route}.json`, this.form.value)
        .subscribe((res) => {
          console.log(res);
          this.closeTask();
        });
    }

    console.log(this.localService.localUser);
  }
}
