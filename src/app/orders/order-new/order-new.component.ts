import { Component, OnInit, ViewChild, ViewEncapsulation, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BranchService } from '../../services/branch.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccessoriesService } from '../../services/accessories.service';
import { environment } from '../../../environments/environment';
import { OrderService } from '../../services/order.service';
import { EventEmitter } from 'events';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class OrderNewComponent implements OnInit {
  customerList;
  productList;
  branchList;
  accessoryCategoryList;
  accessoryList;
  orderDetails;

  currentStep=1;
  fromDate;
  toDate;
  toTime;
  fromTime;
  totalStep=3;
  dateError="";
  isDisable=true;
  acc_array_list=[];
  trackableProductList;
  imageUrl=environment.imageUrl;

  filterForm:FormGroup;
  trackableFrom:FormGroup;
  accessoryFrom:FormGroup;
  orderForm:FormGroup;
  dateForm:FormGroup;
  productForm:FormGroup;
  @ViewChild('productModal') productModal;
  @Output() dateSelect = new EventEmitter();
  
  constructor(
    private customerService:UserService,
    private productService:ProductService,
    private branchService:BranchService,
    private accService:AccessoriesService,
    private orderService:OrderService,
    private modalService:NgbModal,
    private fb:FormBuilder,
    private router:Router,
    private toastr: ToastrService
  )
  {
    this.filterForm=fb.group({
      branchId:['',Validators.required],
      customerId:['',Validators.required],
      productId:[]
    })

    this.productForm=new FormGroup({
      productId: new FormControl()
    })
  
    //productId:['',Validators.required]
    this.trackableFrom = new FormGroup({
      trackableItem: new FormControl()
    }); 

    this.accessoryFrom = new FormGroup({
      accItem: new FormControl()
    }); 

    this.orderForm=fb.group({
      customerId:['',Validators.required],
      fromTime:['',Validators.required],
      toTime:['',Validators.required],
      branchId:[],
      productId:['',Validators.required],
      trackableProductId:['',Validators.required],
      accesArray:['',Validators.required],
      paymenType:'card',
      deviceid:'admin'
    })
  }

  ngOnInit() {
    this.getUserList();
    this.getBranchList();
    this.getAccessory();
  }
  
  getBranchList(){
    this.branchService.get().subscribe(response=>{
      this.branchList=response;
    })
  }

  getUserList(){
    this.customerService.get().subscribe(response=>{
      this.customerList=response;
      const temp = this.customerList.filter(function(d) {
        return d.roles.indexOf('ROLE_USER') != -1 ;
      });
      this.customerList=temp;
    })
  }

  getProductList(){
    let formData=new FormData();
    formData.append('fromTime',this.getFromDate);
    formData.append('toTime',this.getToDate);
    formData.append('branchId',this.branch);
    this.orderService.getProductList(formData).subscribe(response=>{
      this.productList=response;
      console.log('---');
      console.log( this.productList)
    })
  }

  getAccessory(){
    this.accService.get().subscribe(response=>{
      this.accessoryCategoryList=response;
    })
  }

  updateAccessoryList(event){
    this.accessoryList=this.accessoryCategoryList[event.value].accessories;
  }

  // openPopUp(){
  //   this.modalService.open(this.productModal, { size: 'lg' });
    
  // }

  onSelectProduct(){
    console.log(this.filterForm.value)
    this.productService.productBranch(this.filterForm.value).subscribe(response=>{
      let data=response as obj;
      this.trackableProductList=data.trackableProduct;
     // this.modalService.open(this.productModal, { size: 'lg' });
    })
  }
  updateAccessory(id,data){
    let isExits=-1;
    this.acc_array_list.forEach(function(item,index){
      if(item.accsId==id){
        isExits=index;
      }
    });
    if(isExits==-1)
      this.acc_array_list.push(
        {accsId:id ,quantity:data.value}
      )
    else{
      this.acc_array_list.splice(isExits,1)
    } 

    console.log(this.acc_array_list);
    
  }
  dateValidation(){
    let fDate = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day+1);
    let fromDate=this.format(fDate, 'dd-MM-yyyy')+" "+this.fromTime;

    let tDate = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day+1);
    let  toDate=this.format(tDate, 'dd-MM-yyyy')+" "+this.toTime;

    if(fDate &&  tDate && this.fromTime && this.toTime)
    {
      //console.log(this.toTime +""+(this.fromTime+4));
      
      // if(tDate==fDate && (this.toTime<=(this.fromTime+4))){
      //   this.dateError="Pick up time should be more than 4 hour";
      // }
      if(tDate<fDate){
        this.dateError="Please enter a valid pick up date";
      }else{
        this.dateError="";
        this.isDisable=false;
      }
    }
  }
  showNextSetp(){
    if(this.currentStep<this.totalStep){
      if(this.currentStep==1){
        this.getProductList();
      }
      if(this.currentStep==2){
        this.filterForm.get('productId').setValue(this.productForm.get('productId').value);
        this.onSelectProduct();
      }
      this.currentStep++;
      this.isDisable=true;
    }
  }
  placeOrder(){
    let fromDate=this.getFromDate;
    let  toDate=this.getToDate;
    if(toDate<fromDate){
      this.dateError="Please enter a valid pick up date";
    }
    this.orderForm.setValue(
      {
        customerId:this.filterForm.get('customerId').value,
        fromTime:fromDate,
        toTime:toDate,
        branchId:this.branch,
        productId:this.productForm.get('productId').value,
        trackableProductId:this.trackableFrom.get('trackableItem').value,
        accesArray:this.acc_array_list,
        paymenType:'card',
        deviceid:'admin'
      }
    )
    this.isDisable=true;
    
    this.orderService.makeOrder(this.orderForm.value).subscribe(response=>{
      this.toastr.success('Order Placed Successfully.');
      this.router.navigate(['order/view/1']);
    },error=>{
      this.toastr.error('Some problem occured. Check your connection.');
    })
  }
  format = function date2str(x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
    });

    return y.replace(/(y+)/g, function(v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}
  get customer(){
    return this.filterForm.get('customerId').value;
  }
  get branch(){
    return this.filterForm.get('branchId').value;
  }

  get getFromDate(){
    let fDate = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day+1);
    let fromDate=this.format(fDate, 'dd-MM-yyyy')+" "+this.fromTime;
    return fromDate;
  }

  get getToDate(){
    let tDate = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day+1);
    let  toDate=this.format(tDate, 'dd-MM-yyyy')+" "+this.toTime;
    return toDate;
  }
}

class obj{
  trackableProduct
}