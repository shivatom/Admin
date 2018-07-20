import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class EditTrackComponent implements OnInit {
  @Input() product;
  @Input() branch;
  @ViewChild ('stock') stock;
  @ViewChild('myTable') table: any;

  //Variables
  trackableProduct;
  editing={};
  temp;
  editMode=false;

  //Form 
  stockForm:FormGroup;
  propertyValueForm:FormGroup;
  constructor(private productService:ProductService, private modalService:NgbModal, private fb:FormBuilder) { 
    this.stockForm= fb.group({
      id:[],
      stock:['',Validators.required]
    })

    this.propertyValueForm=fb.group({

    })
  }

  ngOnInit() {
    this.trackableProduct=this.product.trackableProduct;
    console.log(this.trackableProduct);
    
    this.temp=this.product.trackableProduct;
    this.stockForm.get('id').setValue(this.product.id);
  }

  rowEditMode(index,status){
    for (var key in this.trackableProduct[0]) {
      this.editing[index + '-'+key]=status;
    }
   
    if(!status && this.trackableProduct[index].status=='new'){
      this.trackableProduct.splice(index,1)
    }
  }

  addNewItem(){
    console.log(this.stockForm.value);
    this.productService.addTrackProductStock(this.stockForm.value).subscribe(response=>{
       this.refreshProductList();
       this.stockForm.reset();
    });
  } 

  deleteProp(id){
    this.productService.productRemoveProperty(id).subscribe(response=>{
      this.refreshProductList();
      //this.stockForm.reset();
   });
  }

  addProp(tag){
    let form=new FormData();
    form.append('id',this.product.id);
    form.append('propertyKey',tag.value);
    this.productService.productAddProperty(form).subscribe(response=>{
      this.refreshProductList();
    });
  }

  deleteStock(id){
    this.productService.removeTrackProductStock(id).subscribe(response=>{
      this.refreshProductList();
   });
  }

  refreshProductList(){
    let form=new FormData();
    form.append('productId',this.product.id);
    form.append('branchId',this.branch);
    this.productService.productBranch(form).subscribe(response=>{
      let data=response as obj;
      this.trackableProduct=data.trackableProduct;
      this.temp=data.trackableProduct;
    })
    // this.productService.getProductById(this.product.id).subscribe(response=>{
    //   let data=response as obj;
    //   this.product=response;
    //   console.log(this.product);
    //   this.trackableProduct=data.trackableProduct;
    // });
    
  }
  
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.stockId.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.trackableProduct = temp;
  }

  statusFilter(event){
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.trackableProduct = temp;
  }

  addStock(){
    
   // console.log(this.stock)
    // this.productService.addTrackProductStock().subscribe(response=>{
    //   console.log(response);
    // })
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  toggleProperty(i){
    this.editing[i  + '-id']=!this.editing[i  + '-id']; 
  }
  
  saveProvertyValue(i,id,data){
    this.editing[i  + '-id']=!this.editing[i  + '-id'];  
    let propertyValue=[];
    propertyValue[0]=id;
    propertyValue[1]=data.value;
     
    let form=new FormData();
    let fm= this.fb.group({
      propertyValue : this.fb.array([
        this.fb.group({
          id:[],
          value:[],
        }),
        this.fb.group({
          id:[],
          value:[],
        })
      ])
    })
    
    
    
    form.append('id',id);
    form.append('propertyValue','');
    this.productService.updatePropertyValue(35,propertyValue).subscribe(response=>{
      console.log(response);
      
    })
  }
}

class obj{
  trackableProduct
}