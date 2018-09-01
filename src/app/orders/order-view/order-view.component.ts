import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  orderDetails;
  pageId;
  orderId=undefined;
  imageUrl=environment.imageUrl;
  constructor(private orderService:OrderService , private router:ActivatedRoute, private toastr: ToastrService) {
    this.pageId=router.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.oderDetails(this.pageId);
  }

  oderDetails(id){
    this.orderService.getBy(id).subscribe(response=>{
      this.orderDetails=response;
      console.log(this.orderDetails)
    })
  }

  startOrderItems(){
    this.orderService.startOrderItem(this.pageId).subscribe(response=>{
      this.oderDetails(this.pageId);
      this.toastr.success('Item started successfully.');
    }, error=>{
      this.toastr.error('Cant able to start. Try Again.');
    })
  }

  stopOrderItems(){
    this.orderService.stopOrderItem(this.pageId).subscribe(response=>{
      this.oderDetails(this.pageId);
      this.toastr.success('Item stopped successfully.');
    }, error=>{
      this.toastr.error('Cant able to stop. Try Again.');
    })
  }

  cancelOrderItems(){
    this.orderService.cancelOrderItem(this.pageId).subscribe(response=>{
      this.oderDetails(this.pageId);
      this.toastr.success('Item stopped successfully.');
    }, error=>{
      this.toastr.error('Cant able to stop. Try Again.');
    })
  }

}
