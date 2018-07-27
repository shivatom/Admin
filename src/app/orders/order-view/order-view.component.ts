import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  orderDetails;
  pageId;
  constructor(private orderService:OrderService , private router:ActivatedRoute) { 
    this.pageId=router.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.oderDetails(this.pageId);
  }

  oderDetails(id){
    this.orderService.getBy(id).subscribe(response=>{
      this.orderDetails=response;
    })
  }

}
