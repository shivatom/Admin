import { Component, OnInit, ViewChild } from '@angular/core';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent} from 'angular-calendar';
import {startOfDay,endOfDay,subDays,addDays, endOfMonth, isSameDay,isSameMonth,addHours} from 'date-fns'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})

export class CalenderComponent implements OnInit {

  viewDate: Date = new Date();
  bookprice:FormGroup;
  activeDayIsOpen=false;
  view: string = 'month';
  refresh: Subject<any> = new Subject();
  @ViewChild('content') content;
  constructor(private modalService: NgbModal , private fb:FormBuilder) { 
    this.bookprice= fb.group({
      mode:[],
      day:[],
      price :[]
    })
  }

  ngOnInit() {
  }
  
  events: CalendarEvent[] = [
  
    {
      start: startOfDay(new Date()),
      title: '$34',
      color: colors.yellow,
    //  actions: this.actions
    }
  ];

  
  dayClicked(event){
    this.bookprice.get('day').setValue(event.date);
    this.bookprice.get('mode').setValue('day');
    this.open(this.content);
  }

  bookSlot(){
    let self=this;
    this.events.push({ 
      "start" :  self.bookprice.get('day').value,
      title: self.bookprice.get('price').value,
      color: colors.yellow,
    });
    this.refresh.next();
    console.log( this.events)
  }

  // Modal
  open(content) {
    this.modalService.open(content);
  }

}
