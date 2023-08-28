import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import TimeGrid from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import Lists from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskService } from 'src/app/core/services/task.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';
import { flatMap, map, mergeMap, toArray } from 'rxjs';
import { C, cl } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],

  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss'],
})
export class UpcomingComponent {
  Events: any[] = [];
  calendarOptions: any = {
    plugins: [interactionPlugin, dayGridPlugin, TimeGrid, Lists],
    initialView: 'dayGridMonth',
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
  };
  constructor(
    private httpClient: HttpClient,
    private taskService: TaskService,
    private localService: LocalstorageService
  ) {}
  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  ngOnInit() {
    this.taskService
      .get(`${this.localService.localUser()}.json`)
      .pipe(
        mergeMap((res: any) => Object.values(res)),
        map((tasks: any) => Object.values(tasks)),
        mergeMap((taskArray: any) =>
          taskArray.map((task: any) => ({
            title: task.taskName,
            date: task.taskDate,
          }))
        ),
        toArray()
      )
      .subscribe((tasks: any) => {
        tasks.map((task: any) => console.log(task.title));
        this.calendarOptions.events = tasks.map((task: any) => ({
          title: task.title,
          date: task.date,
        }));

        console.log(this.calendarOptions.events);
      });
  }
}
