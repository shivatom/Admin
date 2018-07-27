import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class EditTrackComponent implements OnInit {
  @Input() product;
  @Input() productId;
  @Input() branch;
  @ViewChild ('stock') stock;
  @ViewChild('myTable') table: any;

  //Variables
  trackableProduct;
  editing={};
  temp;
  editMode=false;
  selectedRow;
  openedModal;

  //Form 
  stockForm:FormGroup;
  propertyValueForm:FormGroup;
  constructor(private productService:ProductService, private modalService:NgbModal, private fb:FormBuilder, private toastr: ToastrService) { 
    this.stockForm= fb.group({
      id:[''],
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


  addNewItem(){
    this.stockForm.get('id').setValue(this.product.id)
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
    form.append('productId',this.productId);
    form.append('branchId',this.branch);
    this.productService.productBranch(form).subscribe(response=>{
      let data=response as obj;
      this.product=data;
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



  propList(id? , value?):FormGroup{
    return this.fb.group({
      id:[id],
      value:[value],
    })
  }

  updateProductPropertyValues(content, row){
    this.selectedRow=row;
    this.propertyValue.controls=[];
    row.propertyValues.forEach((propertyResponse,index) => {
      this.propertyValue.push(this.propList(
        propertyResponse.id,
        propertyResponse.value
      ));
    });
    this.open(content);
  }

  updatePropertyValue(content){    
    this.productService.updatePropertyValue(this.selectedRow.id ,this.propertyValueForm.value).subscribe(response=>{
      this.refreshProductList();
      this.close(content);
    })
  }

  open(content) {
    this.openedModal=this.modalService.open(content);
  }

  close(content){
    this.openedModal.close();
  }
  
}

class obj{
  trackableProduct
}