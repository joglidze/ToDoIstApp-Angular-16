import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';

import TimeGrid from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import Lists from '@fullcalendar/list';

import interactionPlugin from '@fullcalendar/interaction';
import { BaseService } from 'src/app/core/services/base.service';
import { LocalstorageService } from 'src/app/facade/localstorage.service';
import { map, mergeMap, toArray } from 'rxjs';



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
    events: [
      {
        title: 'The Title',

        start: '2023-09-01', // a property!
        end: '2018-09-02',
      },
    ],

    eventColor: '#378006',
    headerToolbar: {
      left: 'prev next today',
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
   
    private BaseService: BaseService,
    private localService: LocalstorageService
  ) {}
  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  ngOnInit() {
    this.BaseService.get(`${this.localService.localUser()}.json`)
      .pipe(
        mergeMap((res: any) => Object.values(res)),
        map((tasks: any) => Object.values(tasks)),
        mergeMap((taskArray: any) =>
          taskArray.map((task: any) => ({
            title: task.taskDescripiton,
            taskStart: task.taskStart,
            taskEnd: task.taskEnd,
          }))
        ),
        toArray()
      )
      .subscribe((tasks: any) => {
        console.log(tasks);
        tasks.map((task: any) => console.log(task.title));
        this.calendarOptions.events = tasks.map((task: any) => ({
          title: task.title, // a property!
          start: task.taskStart, // a property!
          end: task.taskEnd,
        }));
        console.log(this.calendarOptions.events);
      });
    console.log(this.calendarOptions.events);
  }
}
