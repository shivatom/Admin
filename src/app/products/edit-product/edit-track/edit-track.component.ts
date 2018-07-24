import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray,FormBuilder, Validators } from '@angular/forms';

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
      propertyValue : this.fb.array([])
    })
  }

  ngOnInit() {
    this.trackableProduct=this.product.trackableProduct;
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

  get propertyValue(){
    return this.propertyValueForm.get('propertyValue') as FormArray;
  }

  toggleExpandRow(row) {
    row.propertyValues.forEach((propertyResponse,index) => {
      this.propertyValue.push(this.propList(
        propertyResponse.productProperties.id,
        propertyResponse.productProperties.value
      ));
    });
    this.table.rowDetail.toggleExpandRow(row);
  }

  addPropertyValue(){
    console.log(this.propertyValueForm.value)
    this.productService.updatePropertyValue(3,this.propertyValueForm.value).subscribe(response=>{
      console.log(response);
    })
  }

  propList(id? , value?):FormGroup{
    return this.fb.group({
      id:[id],
      value:[value],
    })
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  toggleProperty(i){
    this.editing[i  + '-id']=!this.editing[i  + '-id']; 
  }
  
  saveProvertyValue(i,id,data){
    
  }
}

class obj{
  trackableProduct
}