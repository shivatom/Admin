import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { startOfDay } from 'date-fns';
import { CalendarEvent } from 'angular-calendar';

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
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})


export class EditProductComponent implements OnInit {
  rows = [];
  editing={};
  total_stock=0;
  temp;

  // Calendar
  viewDate: Date = new Date();
  bookprice:FormGroup;
  activeDayIsOpen=false;
  view: string = 'month';
  refresh: Subject<any> = new Subject();
  @ViewChild('content') content;
  
  constructor(private modalService: NgbModal , private fb:FormBuilder) { 
    this.fetch((data) => {
      this.temp =data;
      this.rows = data;
    });

    this.bookprice= fb.group({
      mode:[],
      day:[],
      price_day :[],
      price_hour :[]
    })
  }

  fetch(data){
    //API Call
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/product.json`);
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  } 

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.identifier.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }

  addStock(input){
    this.total_stock=this.total_stock+Number(input.value);
  }

  removeStock(input){
    this.total_stock=this.total_stock-Number(input.value);
  }

  statusFilter(event){
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }

  rowEditMode(index,status){
    for (var key in this.rows[0]) {
      this.editing[index + '-'+key]=status;
    }
   
    if(!status && this.rows[index].status=='new'){
      console.log(index)
      this.rows.splice(index,1)
    }
  }

  addNewItem(){
    this.rows.unshift({
      "identifier": "Humphrey Curtis",
      "status": "new"
    })
    this.editing[0 + '-identifier']=true;
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
      title: self.bookprice.get('price_day').value + '|'+self.bookprice.get('price_hour').value,
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
