import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { startOfDay } from 'date-fns';
import { CalendarEvent } from 'angular-calendar';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { BranchService } from '../../services/branch.service';
import { CategoryService } from '../../services/category.service';
import { environment } from '../../../environments/environment';

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
  styleUrls: ['./edit-product.component.scss'],
  encapsulation:ViewEncapsulation.None
})


export class EditProductComponent implements OnInit {
  rows = [];
  
  temp;

  settingForm:FormGroup;
  bookprice:FormGroup;
  pricingForm:FormGroup;

  imageUrl=environment.imageUrl;

  product_id;
  image;
  product;
  trackableProduct;
  branchDetails;
  cat_list;
  branch_list;
  viewDate: Date = new Date();
  activeDayIsOpen=false;
  view: string = 'month';
  refresh: Subject<any> = new Subject();
  error={
    show:false,
    text:"",
    status:""
  };
  @ViewChild('content') content;
  constructor(
    private modalService: NgbModal, 
    private productService:ProductService ,
    private branchService:BranchService,
    private catService:CategoryService,
    private router:ActivatedRoute, 
    private productservice:ProductService,
    private fb:FormBuilder) 
    {
    this.product_id=router.snapshot.paramMap.get('id');
    //Price book form
    this.bookprice= fb.group({
      mode:[],
      day:[],
      price_day :[],
      price_hour :[]
    })
    //Product edit form
    this.settingForm= fb.group(
    {  
      id:[this.product_id],
      productName:['',Validators.required],
      description:['',Validators.required],
      categoryId:['',Validators.required],
      imageFile:['']
    });

    this.pricingForm = fb.group(
    {  
      id:[this.product_id],
      perHour:['',Validators.required],
      perDay:['',Validators.required],
    });
  }

  ngOnInit() {
    this.getProduct(this.product_id);
    this.fetch((data) => {
      this.temp =data;
      this.rows = data;
    });

    this.branchService.get().subscribe(response=>{
      this.branch_list=response;
    })

    this.catService.get().subscribe(response=>{
      this.cat_list=response;
    })
  }
  getBranchDetails(id){
    let form=new FormData();
    form.append('productId',this.product.id);
    form.append('branchId',id.value);
    
    this.productService.productBranch(form).subscribe(response=>{
      this.branchDetails=response;
      this.pricingForm.get('perHour').setValue(this.branchDetails.perHour);
      this.pricingForm.get('perDay').setValue(this.branchDetails.perDay);
    })
    
  }

  //Add Property to product
  addProp(tag){
    let form=new FormData();
    form.append('id',this.product.id);
    form.append('propertyKey',tag.value);
    this.productService.productAddProperty(form).subscribe(response=>{
      this.refreshProductList();
    });
  }

  //Delete Property to product
  deleteProp(id){
    this.productService.productRemoveProperty(id).subscribe(response=>{
      this.refreshProductList();
      //this.stockForm.reset();
   });
  }


  refreshProductList(){
    this.productService.getProductById(this.product.id).subscribe(response=>{
      let data=response as obj;
      this.product=response;
      this.trackableProduct=data.trackableProduct;
    });
  }
  updateProduct(){
    this.productservice.updateProduct(this.productservice.createFormData(this.settingForm.value)).subscribe(response=>{
      this.error.show=true;
      this.error.status='success';
      this.error.text="Product is updated successfully!!";
     
    },error=>{
      console.log(error)
      this.error.show=true;
      this.error.status='danger';
      this.error.text="Product name already exits";
    })
  }

  updatePrice(){
    this.productservice.updatePrice(this.pricingForm.value).subscribe(response=>{
      this.error.show=true;
      this.error.status='success';
      this.error.text="Updated successfully!!";
     
    },error=>{
      console.log(error)
      this.error.show=true;
      this.error.status='danger';
      this.error.text="Error";
    })
  }
  getProduct(id){
    this.productService.getProductById(id).subscribe(Response=>{
      this.product=Response;
      this.settingForm.get('productName').setValue(this.product.productName);
      this.settingForm.get('description').setValue(this.product.description);
      this.settingForm.get('categoryId').setValue(this.product.category.id);
      this.settingForm.get('imageFile').setValue(this.product.logo);
      this.product.logo=this.product.logo.replace(" ",'');
      this.image=this.imageUrl+"product/images/"+this.product.logo;
     
    })
  }

  onSelectImage(event){
    var myReader: FileReader = new FileReader();
    this.settingForm.get('imageFile').setValue(event.target.files[0]);
    myReader.onloadend = (e) => {
      this.image=myReader.result;
    }
    myReader.readAsDataURL(event.target.files[0]);
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

class obj{
  trackableProduct
}