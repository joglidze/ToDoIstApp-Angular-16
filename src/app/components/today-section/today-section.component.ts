import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-today-section',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent],
  templateUrl: './today-section.component.html',
  styleUrls: ['./today-section.component.scss'],
})
export class TodaySectionComponent {
  taskBoolean: boolean = false;
  date= new Date()
  closeTask(close:any) {
    this.taskBoolean = close;
  }
}
